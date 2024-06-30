package org.cfms.co2eevaluationcfms.service.implementation;

import jakarta.transaction.Transactional;
import org.cfms.co2eevaluationcfms.dto.*;
import org.cfms.co2eevaluationcfms.entity.Evaluation;
import org.cfms.co2eevaluationcfms.entity.Result;
import org.cfms.co2eevaluationcfms.entity.SupplyItem;
import org.cfms.co2eevaluationcfms.exception.ProductionMatrixNotFoundException;
import org.cfms.co2eevaluationcfms.exception.SupplyItemNotFoundException;
import org.cfms.co2eevaluationcfms.repository.EvaluationRepository;
import org.cfms.co2eevaluationcfms.repository.ResultRepository;
import org.cfms.co2eevaluationcfms.repository.SupplyItemRepository;
import org.cfms.co2eevaluationcfms.repository.SupplyRepository;
import org.cfms.co2eevaluationcfms.service.EvaluationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EvaluationServiceImple implements EvaluationService {

    private EvaluationRepository evaluationRepository;

    private ResultRepository resultRepository;

    private CustomerServiceClient customerServiceClient;

    private SupplyRepository supplyRepository;

    private SupplyItemRepository supplyItemRepository;

    private VehicleServiceClient vehicleServiceClient;

    private VendorServiceClient vendorServiceClient;

    private TransportationEmissionServiceClient transportationEmissionServiceClient;

    private ProductionEmissionServiceClient productionEmissionServiceClient;

    private ModelMapper modelMapper;

    @Autowired
    public EvaluationServiceImple(EvaluationRepository evaluationRepository, ResultRepository resultRepository, CustomerServiceClient customerServiceClient, SupplyRepository supplyRepository, SupplyItemRepository supplyItemRepository, VehicleServiceClient vehicleServiceClient, VendorServiceClient vendorServiceClient, TransportationEmissionServiceClient transportationEmissionServiceClient, ProductionEmissionServiceClient productionEmissionServiceClient, ModelMapper modelMapper) {
        this.evaluationRepository = evaluationRepository;
        this.resultRepository = resultRepository;
        this.customerServiceClient = customerServiceClient;
        this.supplyRepository = supplyRepository;
        this.supplyItemRepository = supplyItemRepository;
        this.vehicleServiceClient = vehicleServiceClient;
        this.vendorServiceClient = vendorServiceClient;
        this.transportationEmissionServiceClient = transportationEmissionServiceClient;
        this.productionEmissionServiceClient = productionEmissionServiceClient;
        this.modelMapper = modelMapper;
    }

    public List<EvaluationDTO> getEvaluations() {

        return evaluationRepository.findAll().stream()
                .map(evaluation -> modelMapper.map(evaluation, EvaluationDTO.class))
                .toList();

    }

    @Transactional
    public EvaluationDTO addEvaluation(DeliveryDTO deliveryDTO) {

        CustomerDTO customerDTO = customerServiceClient.getCustomerById(deliveryDTO.getCustomerId());
        VehicleDTO vehicleDTO = vehicleServiceClient.getVehicleById(deliveryDTO.getVehicleId());

        // Calculating fuel_consumption in (L/100km)
        double fuelConsumptionLPer100Km = (deliveryDTO.getFuelConsumption()/customerDTO.getDistanceFromWarehouse()) * 100;

        // Predicting Total Outbound Transportation Emission (g/km).
        Integer predictedOutboundTransportationCO2eEmissionGPerKm = transportationEmissionServiceClient.predictTransportationEmission(vehicleDTO.getModel(), vehicleDTO.getEngineSize(), vehicleDTO.getCylinders(), fuelConsumptionLPer100Km, vehicleDTO.getVehicleType(), vehicleDTO.getFuelType());

        // Total Outbound Transportation Emission (kg)
        // Finding emission for total distance and converting it to kg
        double predictedOutboundTransportationCO2eEmissionKg = (predictedOutboundTransportationCO2eEmissionGPerKm * customerDTO.getDistanceFromWarehouse()) / 1000;

        // Finding the Total Quantity of Products Being involved in Delivery (Outbound Transportation).
        int totalQuantity = deliveryDTO.getDeliveryItems().stream()
                .mapToInt(DeliveryItemDTO::getQuantity)
                .sum();

        Evaluation evaluation = Evaluation.builder()
                .jobName(deliveryDTO.getJobName())
                .customerId(deliveryDTO.getCustomerId())
                .vehicleId(deliveryDTO.getVehicleId())
                .results(new ArrayList<>())
                .build();

        evaluationRepository.save(evaluation);

        for (DeliveryItemDTO deliveryItemDTO : deliveryDTO.getDeliveryItems()) {

            VendorDTO vendorDTO = vendorServiceClient.getVendorById(deliveryItemDTO.getVendorId());

            ProductionMatrixDTO productionMatrixDTO = vendorDTO.getVendorProducts().stream()
                    .filter(vendorProductDTO -> deliveryItemDTO.getProductName().equals(vendorProductDTO.getProductName()))
                    .map(VendorProductDTO::getProductionMatrix)
                    .findFirst()
                    .orElseThrow(() -> new ProductionMatrixNotFoundException("ProductionMatrix not found for " + deliveryItemDTO.getProductName() + " Of Vendor " + vendorDTO.getVendorName()));

            Double predictedProductionCO2eEmissionPerKg = productionEmissionServiceClient.predictProductionEmission(productionMatrixDTO.getRegion(), productionMatrixDTO.getAnimalSpecies(), productionMatrixDTO.getProductionSystem(), productionMatrixDTO.getCommodity());
            Double totalProductionCO2eEmission = calculateTotalProductionCO2eEmission(predictedProductionCO2eEmissionPerKg, deliveryItemDTO.getQuantity());

            // Retrieve VendorSupplies to get Inbound Emission
            List<SupplyItem> vendorSupplies = supplyItemRepository.findByVendorIdAndProductNameOrderByDateAsc(deliveryItemDTO.getVendorId(), deliveryItemDTO.getProductName());

            // Select the First Supply which satisfy the customer quantity Req
            SupplyItem supplyItem = vendorSupplies.stream()
                    .filter(supply -> deliveryItemDTO.getQuantity() < supply.getQuantity())
                    .findFirst()
                    .orElseThrow(() -> new SupplyItemNotFoundException("No Supply found to satisfy the quantity of " + deliveryItemDTO.getQuantity() + " units of '" + deliveryItemDTO.getProductName() + "' from '" + vendorDTO.getVendorName() + "'"));

            Result result = Result.builder()
                    .evaluation(evaluation)
                    .vendorId(deliveryItemDTO.getVendorId())
                    .productName(deliveryItemDTO.getProductName())
                    .quantity(deliveryItemDTO.getQuantity())
                    .inboundCO2eEmissionKg((supplyItem.getInboundCO2eEmissionKg()/ supplyItem.getQuantity()) * deliveryItemDTO.getQuantity())
                    .outboundCO2eEmissionKg(((double)deliveryItemDTO.getQuantity()/totalQuantity) * predictedOutboundTransportationCO2eEmissionKg)
                    .productionCO2eEmissionKg(totalProductionCO2eEmission)
                    .build();

            resultRepository.save(result);

            evaluation.getResults().add(result);

        }

        return modelMapper.map(evaluation, EvaluationDTO.class);

    }

    // Calculating Total Production Emission using Quantity and predictedProductionCO2eEmissionPerKg.
    public Double calculateTotalProductionCO2eEmission(double predictedProductionCO2eEmissionPerKg, int quantity){

        return predictedProductionCO2eEmissionPerKg*quantity;
    }

    public void deleteEvaluationById(Long evaluationId) {

        evaluationRepository.deleteById(evaluationId);

    }
}
