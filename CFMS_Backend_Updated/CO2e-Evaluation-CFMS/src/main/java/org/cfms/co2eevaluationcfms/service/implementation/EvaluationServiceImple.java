package org.cfms.co2eevaluationcfms.service.implementation;

import jakarta.transaction.Transactional;
import org.cfms.co2eevaluationcfms.dto.DeliveryItemDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationReqDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationResDTO;
import org.cfms.co2eevaluationcfms.dto.CustomerDTO;
import org.cfms.co2eevaluationcfms.dto.VehicleDTO;
import org.cfms.co2eevaluationcfms.dto.ProductionMatrixDTO;
import org.cfms.co2eevaluationcfms.dto.VendorDTO;
import org.cfms.co2eevaluationcfms.dto.VendorProductDTO;
import org.cfms.co2eevaluationcfms.entity.Evaluation;
import org.cfms.co2eevaluationcfms.entity.Result;
import org.cfms.co2eevaluationcfms.entity.VendorSupply;
import org.cfms.co2eevaluationcfms.repository.EvaluationRepository;
import org.cfms.co2eevaluationcfms.repository.ResultRepository;
import org.cfms.co2eevaluationcfms.repository.VendorSupplyRepository;
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

    private VendorSupplyRepository vendorSupplyRepository;

    private VehicleServiceClient vehicleServiceClient;

    private VendorServiceClient vendorServiceClient;

    private TransportationEmissionServiceClient transportationEmissionServiceClient;

    private ProductionEmissionServiceClient productionEmissionServiceClient;

    private ModelMapper modelMapper;

    @Autowired
    public EvaluationServiceImple(EvaluationRepository evaluationRepository, ResultRepository resultRepository, CustomerServiceClient customerServiceClient, VendorSupplyRepository vendorSupplyRepository, VehicleServiceClient vehicleServiceClient, VendorServiceClient vendorServiceClient, TransportationEmissionServiceClient transportationEmissionServiceClient, ProductionEmissionServiceClient productionEmissionServiceClient, ModelMapper modelMapper) {
        this.evaluationRepository = evaluationRepository;
        this.resultRepository = resultRepository;
        this.customerServiceClient = customerServiceClient;
        this.vendorSupplyRepository = vendorSupplyRepository;
        this.vehicleServiceClient = vehicleServiceClient;
        this.vendorServiceClient = vendorServiceClient;
        this.transportationEmissionServiceClient = transportationEmissionServiceClient;
        this.productionEmissionServiceClient = productionEmissionServiceClient;
        this.modelMapper = modelMapper;
    }

    public List<EvaluationResDTO> getEvaluations() {

        return evaluationRepository.findAll().stream()
                .map(evaluation -> modelMapper.map(evaluation, EvaluationResDTO.class))
                .toList();

    }

    @Transactional
    public EvaluationResDTO addEvaluation(EvaluationReqDTO evaluationReqDTO) {

        CustomerDTO customerDTO = customerServiceClient.getCustomerById(evaluationReqDTO.getCustomerId());
        VehicleDTO vehicleDTO = vehicleServiceClient.getVehicleById(evaluationReqDTO.getVehicleId());

        // Calculating fuel_consumption in (L/100km)
        double fuel_consumption_L_per_100km = (evaluationReqDTO.getFuelConsumption()/customerDTO.getDistanceFromWarehouse()) * 100;

        Integer predictedOutboundTransportationCo2eEmission = transportationEmissionServiceClient.predictTransportationEmission(vehicleDTO.getModel(), vehicleDTO.getEngineSize(), vehicleDTO.getCylinders(), fuel_consumption_L_per_100km, vehicleDTO.getVehicleType(), vehicleDTO.getFuelType());

        // Finding the Total Quantity of Products Being involved in Delivery (Outbound Transportation).
        int totalQuantity = evaluationReqDTO.getDeliveryItems().stream()
                .mapToInt(DeliveryItemDTO::getQuantity)
                .sum();

        Evaluation evaluation = Evaluation.builder()
                .jobName(evaluationReqDTO.getJobName())
                .customerId(evaluationReqDTO.getCustomerId())
                .vehicleId(evaluationReqDTO.getVehicleId())
                .results(new ArrayList<>())
                .build();

        evaluationRepository.save(evaluation);

        for (DeliveryItemDTO deliveryItemDTO : evaluationReqDTO.getDeliveryItems()) {

            VendorDTO vendorDTO = vendorServiceClient.getVendorById(deliveryItemDTO.getVendorId());

            ProductionMatrixDTO productionMatrixDTO = vendorDTO.getVendorProducts().stream()
                    .filter(vendorProductDTO -> deliveryItemDTO.getProductName().equals(vendorProductDTO.getProductName()))
                    .map(VendorProductDTO::getProductionMatrix)
                    .findFirst()
                    .orElseThrow(() -> new NoSuchElementException("ProductionMatrix not found for " + deliveryItemDTO.getProductName() + " Of Vendor " + vendorDTO.getVendorName()));


            double predictedProductionCO2eEmissionPerKg = productionEmissionServiceClient.predictProductionEmission(productionMatrixDTO.getRegion(), productionMatrixDTO.getAnimalSpecies(), productionMatrixDTO.getProductionSystem(), productionMatrixDTO.getCommodity());
            double totalProductionCO2eEmission = calculateTotalProductionCO2eEmission(predictedProductionCO2eEmissionPerKg, deliveryItemDTO.getQuantity());

            // Retrieve VendorSupplies to get Inbound Emission
            List<VendorSupply> vendorSupplies = vendorSupplyRepository.findByVendorIdAndProductNameOrderByDateAsc(deliveryItemDTO.getVendorId(), deliveryItemDTO.getProductName());

            // Select the First Supply which satisfy the customer quantity Req
            VendorSupply vendorSupply = vendorSupplies.stream()
                    .filter(supply -> deliveryItemDTO.getQuantity() < supply.getQuantity())
                    .findFirst()
                    .orElseThrow(() -> new NoSuchElementException("No VendorSupply found to satisfy the quantity " + deliveryItemDTO.getQuantity() + " of " + deliveryItemDTO.getProductName() + " from " + vendorDTO.getVendorName()));

            Result result = Result.builder()
                    .evaluation(evaluation)
                    .vendorId(deliveryItemDTO.getVendorId())
                    .productName(deliveryItemDTO.getProductName())
                    .quantity(deliveryItemDTO.getQuantity())
                    .inboundCo2e((vendorSupply.getInboundCo2eEmission()/vendorSupply.getQuantity()) * deliveryItemDTO.getQuantity())
                    .outboundCo2e(((double) deliveryItemDTO.getQuantity()/totalQuantity) * predictedOutboundTransportationCo2eEmission)
                    .productionCo2e(totalProductionCO2eEmission)
                    .build();

            resultRepository.save(result);

            evaluation.getResults().add(result);

        }

        return modelMapper.map(evaluation, EvaluationResDTO.class);

    }

    // Calculating Total Production Emission using Quantity and predictedProductionCO2eEmissionPerKg.
    public double calculateTotalProductionCO2eEmission(double predictedProductionCO2eEmissionPerKg, int quantity){

        return predictedProductionCO2eEmissionPerKg*quantity;
    }

}
