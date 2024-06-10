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

        // Retrieve Vendor
        VendorDTO vendorDTO = vendorServiceClient.getVendorById(supplyReqDTO.getVendorId());

        // Retrieve Vehicle
        VehicleDTO vehicleDTO = vehicleServiceClient.getVehicleById(supplyReqDTO.getVehicleId());

        // Calculating fuel_consumption in (L/100km)
        double fuel_consumption_L_per_100km = (supplyReqDTO.getFuelConsumption()/vendorDTO.getDistanceFromWarehouse()) * 100;

        // Predicting Total Inbound Transportation Emission.
        Integer predictedInboundTransportationCo2eEmission = transportationEmissionServiceClient.predictTransportationEmission(vehicleDTO.getModel(), vehicleDTO.getEngineSize(), vehicleDTO.getCylinders(), fuel_consumption_L_per_100km, vehicleDTO.getVehicleType(), vehicleDTO.getFuelType());

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
                    .InboundCo2eEmission(((double) supplyItemDTO.getQuantity()/totalQuantity) * predictedInboundTransportationCo2eEmission)
                    .build();

            vendorSupplyRepository.save(vendorSupply);

        }

        return supplyReqDTO;

    }

}
