package org.cfms.co2eevaluationcfms.service.implementation;

import jakarta.transaction.Transactional;
import org.cfms.co2eevaluationcfms.dto.*;
import org.cfms.co2eevaluationcfms.entity.VendorSupply;
import org.cfms.co2eevaluationcfms.repository.VendorSupplyRepository;
import org.cfms.co2eevaluationcfms.service.SupplyService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class SupplyServiceImple implements SupplyService {

    private VendorSupplyRepository vendorSupplyRepository;

    private VendorServiceClient vendorServiceClient;

    private VehicleServiceClient vehicleServiceClient;

    private TransportationEmissionServiceClient transportationEmissionServiceClient;

    private ModelMapper  modelMapper;

    @Autowired
    public SupplyServiceImple(VendorSupplyRepository vendorSupplyRepository, VendorServiceClient vendorServiceClient, VehicleServiceClient vehicleServiceClient, TransportationEmissionServiceClient transportationEmissionServiceClient, ModelMapper modelMapper) {
        this.vendorSupplyRepository = vendorSupplyRepository;
        this.vendorServiceClient = vendorServiceClient;
        this.vehicleServiceClient = vehicleServiceClient;
        this.transportationEmissionServiceClient = transportationEmissionServiceClient;
        this.modelMapper = modelMapper;
    }

    public List<SupplyResDTO> getSupplies() {

        return vendorSupplyRepository.findAll().stream()
                .map(vendorSupply -> modelMapper.map(vendorSupply, SupplyResDTO.class))
                .toList();

    }

    @Transactional
    public SupplyReqDTO createSupply(SupplyReqDTO supplyReqDTO) {

        VendorDTO vendorDTO = vendorServiceClient.getVendorById(supplyReqDTO.getVendorId());
        VehicleDTO vehicleDTO = vehicleServiceClient.getVehicleById(supplyReqDTO.getVehicleId());

        // Calculating fuel_consumption in (L/100km)
        double fuelConsumptionLPer100Km = (supplyReqDTO.getFuelConsumption()/vendorDTO.getDistanceFromWarehouse()) * 100;

        // Predicting Total Inbound Transportation Emission (g/km).
        Integer predictedInboundTransportationCO2eEmissionGPerKm = transportationEmissionServiceClient.predictTransportationEmission(vehicleDTO.getModel(), vehicleDTO.getEngineSize(), vehicleDTO.getCylinders(), fuelConsumptionLPer100Km, vehicleDTO.getVehicleType(), vehicleDTO.getFuelType());

        // Total Inbound Transportation Emission (kg)
        // Finding emission for total distance and converting it to kg
        double predictedInboundTransportationCO2eEmissionKg = (predictedInboundTransportationCO2eEmissionGPerKm * vendorDTO.getDistanceFromWarehouse()) / 1000;

        // Datetime of the Transportation.
        OffsetDateTime dateTime = OffsetDateTime.now();

        // Finding the Total Quantity of Products Being involved in the Transportation.
        int totalQuantity = supplyReqDTO.getSupplyItems().stream()
                .mapToInt(SupplyItemDTO::getQuantity)
                .sum();

        for (SupplyItemDTO supplyItemDTO : supplyReqDTO.getSupplyItems()) {

            VendorSupply vendorSupply = VendorSupply.builder()
                    .vendorId(supplyReqDTO.getVendorId())
                    .productName(supplyItemDTO.getProductName().toUpperCase())
                    .date(dateTime)
                    .quantity(supplyItemDTO.getQuantity())
                    .inboundCO2eEmissionKg((supplyItemDTO.getQuantity()/totalQuantity) * predictedInboundTransportationCO2eEmissionKg)
                    .build();

            vendorSupplyRepository.save(vendorSupply);

        }

        return supplyReqDTO;

    }

}
