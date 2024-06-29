package org.cfms.co2eevaluationcfms.service.implementation;

import jakarta.transaction.Transactional;
import org.cfms.co2eevaluationcfms.dto.*;
import org.cfms.co2eevaluationcfms.entity.Supply;
import org.cfms.co2eevaluationcfms.entity.SupplyItem;
import org.cfms.co2eevaluationcfms.entity.SupplyItemKey;
import org.cfms.co2eevaluationcfms.repository.SupplyItemRepository;
import org.cfms.co2eevaluationcfms.repository.SupplyRepository;
import org.cfms.co2eevaluationcfms.service.SupplyService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SupplyServiceImple implements SupplyService {

    private SupplyRepository supplyRepository;

    private SupplyItemRepository supplyItemRepository;

    private VendorServiceClient vendorServiceClient;

    private VehicleServiceClient vehicleServiceClient;

    private TransportationEmissionServiceClient transportationEmissionServiceClient;

    private ModelMapper  modelMapper;

    @Autowired
    public SupplyServiceImple(SupplyRepository supplyRepository, SupplyItemRepository supplyItemRepository, VendorServiceClient vendorServiceClient, VehicleServiceClient vehicleServiceClient, TransportationEmissionServiceClient transportationEmissionServiceClient, ModelMapper modelMapper) {
        this.supplyRepository = supplyRepository;
        this.supplyItemRepository = supplyItemRepository;
        this.vendorServiceClient = vendorServiceClient;
        this.vehicleServiceClient = vehicleServiceClient;
        this.transportationEmissionServiceClient = transportationEmissionServiceClient;
        this.modelMapper = modelMapper;
    }

    public List<SupplyDetailDTO> getSupplies() {

        return supplyItemRepository.findAll().stream()
                .map(supplyItem -> modelMapper.map(supplyItem, SupplyDetailDTO.class))
                .toList();

    }

    @Transactional
    public SupplyDTO createSupply(SupplyDTO supplyDTO) {

        VendorDTO vendorDTO = vendorServiceClient.getVendorById(supplyDTO.getVendorId());
        VehicleDTO vehicleDTO = vehicleServiceClient.getVehicleById(supplyDTO.getVehicleId());

        // Calculating fuel_consumption in (L/100km)
        double fuelConsumptionLPer100Km = (supplyDTO.getFuelConsumption()/vendorDTO.getDistanceFromWarehouse()) * 100;

        // Predicting Total Inbound Transportation Emission (g/km).
        Integer predictedInboundTransportationCO2eEmissionGPerKm = transportationEmissionServiceClient.predictTransportationEmission(vehicleDTO.getModel(), vehicleDTO.getEngineSize(), vehicleDTO.getCylinders(), fuelConsumptionLPer100Km, vehicleDTO.getVehicleType(), vehicleDTO.getFuelType());

        // Total Inbound Transportation Emission (kg)
        // Finding emission for total distance and converting it to kg
        Double predictedInboundTransportationCO2eEmissionKg = (predictedInboundTransportationCO2eEmissionGPerKm * vendorDTO.getDistanceFromWarehouse()) / 1000;

        System.out.println(predictedInboundTransportationCO2eEmissionKg);

        // Finding the Total Quantity of Products Being involved in the Transportation.
        int totalQuantity = supplyDTO.getSupplyItems().stream()
                .mapToInt(SupplyItemDTO::getQuantity)
                .sum();

        Supply supply = Supply.builder()
                .vendorId(supplyDTO.getVendorId())
                .vehicleId(supplyDTO.getVehicleId())
                .fuelConsumptionL(supplyDTO.getFuelConsumption())
                .date(OffsetDateTime.now())
                .supplyItems(new ArrayList<>())
                .build();

        supplyRepository.save(supply);

        for (SupplyItemDTO supplyItemDTO : supplyDTO.getSupplyItems()) {

            SupplyItem supplyItem = SupplyItem.builder()
                    .supplyItemKey(SupplyItemKey.builder()
                            .supply(supply)
                            .productName(supplyItemDTO.getProductName().toUpperCase())
                            .build())
                    .quantity(supplyItemDTO.getQuantity())
                    .inboundCO2eEmissionKg(((double)supplyItemDTO.getQuantity()/totalQuantity) * predictedInboundTransportationCO2eEmissionKg)
                    .build();

            supplyItemRepository.save(supplyItem);

            supply.getSupplyItems().add(supplyItem);

        }

        return modelMapper.map(supply, SupplyDTO.class);

    }

}
