package org.cfms.co2eevaluationcfms.service.implementation;

import jakarta.transaction.Transactional;
import org.cfms.co2eevaluationcfms.dto.DeliveryDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationReqDTO;
import org.cfms.co2eevaluationcfms.dto.EvaluationResDTO;
import org.cfms.co2eevaluationcfms.dto.ProductDTO;
import org.cfms.co2eevaluationcfms.dto.customer.CustomerDTO;
import org.cfms.co2eevaluationcfms.dto.vehicle.VehicleDTO;
import org.cfms.co2eevaluationcfms.dto.vendor.ProductionMatrixDTO;
import org.cfms.co2eevaluationcfms.dto.vendor.VendorDTO;
import org.cfms.co2eevaluationcfms.dto.vendor.VendorProductDTO;
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

import java.time.OffsetDateTime;
import java.util.ArrayList;

@Service
public class EvaluationServiceImple implements EvaluationService {

    private EvaluationRepository evaluationRepository;

    private ResultServiceImple resultServiceImple;

    private ResultRepository resultRepository;

    private CustomerServiceClient customerServiceClient;

    private VendorSupplyRepository vendorSupplyRepository;

    private VehicleServiceClient vehicleServiceClient;

    private VendorServiceClient vendorServiceClient;

    private TransportationEmissionServiceClient transportationEmissionServiceClient;

    private ProductionEmissionServiceClient productionEmissionServiceClient;

    private ModelMapper modelMapper;

    @Autowired
    public EvaluationServiceImple(EvaluationRepository evaluationRepository, ResultServiceImple resultServiceImple, ResultRepository resultRepository, CustomerServiceClient customerServiceClient, VendorSupplyRepository vendorSupplyRepository, VehicleServiceClient vehicleServiceClient, VendorServiceClient vendorServiceClient, TransportationEmissionServiceClient transportationEmissionServiceClient, ProductionEmissionServiceClient productionEmissionServiceClient, ModelMapper modelMapper) {
        this.evaluationRepository = evaluationRepository;
        this.resultServiceImple = resultServiceImple;
        this.resultRepository = resultRepository;
        this.customerServiceClient = customerServiceClient;
        this.vendorSupplyRepository = vendorSupplyRepository;
        this.vehicleServiceClient = vehicleServiceClient;
        this.vendorServiceClient = vendorServiceClient;
        this.transportationEmissionServiceClient = transportationEmissionServiceClient;
        this.productionEmissionServiceClient = productionEmissionServiceClient;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public EvaluationResDTO addEvaluation(EvaluationReqDTO evaluationReqDTO) {

        CustomerDTO customerDTO = customerServiceClient.getCustomerById(evaluationReqDTO.getCustomerId());

        VehicleDTO vehicleDTO = vehicleServiceClient.getVehicleById(evaluationReqDTO.getVehicleId());

        // Calculating fuelConsumption in (L/100km)
        double fuelConsumption = (evaluationReqDTO.getTotalFuelConsumption()/customerDTO.getDistanceFromWarehouse()) * 100;

        // Predicting Total Inbound Transportation Emission.
        Integer predictedOutboundTransportationCo2eEmission = transportationEmissionServiceClient.predictTransportationEmission(vehicleDTO.getModel(), vehicleDTO.getEngineSize(), vehicleDTO.getCylinders(), fuelConsumption, vehicleDTO.getVehicleType(), vehicleDTO.getFuelType());

        // Finding the Total Quantity of Products Being involved in the OutBound Transportation.
        int totalQuantity = evaluationReqDTO.getDeliveries().stream()
                .mapToInt(DeliveryDTO::getQuantity)
                .sum();

        Evaluation evaluation = Evaluation.builder()
                .jobName(evaluationReqDTO.getJobName())
                .customerId(evaluationReqDTO.getCustomerId())
                .vehicleId(evaluationReqDTO.getVehicleId())
                .results(new ArrayList<>())
                .build();

        evaluationRepository.save(evaluation);


        for (DeliveryDTO deliveryDTO: evaluationReqDTO.getDeliveries()) {

            // Production Emission
            // Retrieve Vendor
            VendorDTO vendorDTO = vendorServiceClient.getVendorById(deliveryDTO.getVendorId());

            ProductionMatrixDTO productionMatrixDTO = vendorDTO.getVendorProducts().stream()
                    .filter(vendorProductDTO -> deliveryDTO.getProductName().equals(vendorProductDTO.getProductName()))
                    .map(VendorProductDTO::getProductionMatrix)
                    .findFirst()
                    .orElseThrow();

            System.out.println(productionMatrixDTO);

            // Predicting Production CO2eEmission Per Kg.
            double predictedProductionCO2eEmissionPerKg = productionEmissionServiceClient.predictProductionEmission(productionMatrixDTO.getRegion(), productionMatrixDTO.getAnimalSpecies(), productionMatrixDTO.getProductionSystem(), productionMatrixDTO.getCommodity());

            // Calculating Total Production CO2e Emission.
            double totalProductionCO2eEmission = calculateTotalProductionCO2eEmission(predictedProductionCO2eEmissionPerKg, deliveryDTO.getQuantity());


            // Inbound Emission
            VendorSupply vendorSupply = vendorSupplyRepository.findByVendorIdAndProductName(deliveryDTO.getVendorId(), deliveryDTO.getProductName());

            Result result = Result.builder()
                    .evaluation(evaluation)
                    .vendorId(deliveryDTO.getVendorId())
                    .productName(deliveryDTO.getProductName())
                    .quantity(deliveryDTO.getQuantity())
                    .inboundCo2e((vendorSupply.getInboundCo2eEmission()/vendorSupply.getQuantity()) * deliveryDTO.getQuantity())
                    .outboundCo2e(((double)deliveryDTO.getQuantity()/totalQuantity) * predictedOutboundTransportationCo2eEmission)
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
