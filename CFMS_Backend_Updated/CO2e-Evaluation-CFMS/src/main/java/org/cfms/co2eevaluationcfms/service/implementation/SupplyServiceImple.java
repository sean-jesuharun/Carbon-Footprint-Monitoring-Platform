package org.cfms.co2eevaluationcfms.service.implementation;

import jakarta.transaction.Transactional;
import org.cfms.co2eevaluationcfms.dto.SupplyItemDTO;
import org.cfms.co2eevaluationcfms.dto.SupplyDTO;
import org.cfms.co2eevaluationcfms.dto.VehicleDTO;
import org.cfms.co2eevaluationcfms.dto.VendorDTO;
import org.cfms.co2eevaluationcfms.entity.VendorSupply;
import org.cfms.co2eevaluationcfms.repository.VendorSupplyRepository;
import org.cfms.co2eevaluationcfms.service.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
public class SupplyServiceImple implements SupplyService {

    private VendorSupplyRepository vendorSupplyRepository;

    private VendorServiceClient vendorServiceClient;

    private VehicleServiceClient vehicleServiceClient;

    private TransportationEmissionServiceClient transportationEmissionServiceClient;

    @Autowired
    public SupplyServiceImple(VendorSupplyRepository vendorSupplyRepository, VendorServiceClient vendorServiceClient, VehicleServiceClient vehicleServiceClient, TransportationEmissionServiceClient transportationEmissionServiceClient) {
        this.vendorSupplyRepository = vendorSupplyRepository;
        this.vendorServiceClient = vendorServiceClient;
        this.vehicleServiceClient = vehicleServiceClient;
        this.transportationEmissionServiceClient = transportationEmissionServiceClient;
    }

    @Transactional
    public SupplyDTO createSupply(SupplyDTO supplyDTO) {

        // Retrieve Vendor
        VendorDTO vendorDTO = vendorServiceClient.getVendorById(supplyDTO.getVendorId());

        // Retrieve Vehicle
        VehicleDTO vehicleDTO = vehicleServiceClient.getVehicleById(supplyDTO.getVehicleId());

        // Calculating fuel_consumption in (L/100km)
        double fuel_consumption_L_per_100km = (supplyDTO.getFuelConsumption()/vendorDTO.getDistanceFromWarehouse()) * 100;

        // Predicting Total Inbound Transportation Emission.
        Integer predictedInboundTransportationCo2eEmission = transportationEmissionServiceClient.predictTransportationEmission(vehicleDTO.getModel(), vehicleDTO.getEngineSize(), vehicleDTO.getCylinders(), fuel_consumption_L_per_100km, vehicleDTO.getVehicleType(), vehicleDTO.getFuelType());

        // Datetime of the Transportation.
        OffsetDateTime dateTime = OffsetDateTime.now();

        // Finding the Total Quantity of Products Being involved in the Transportation.
        int totalQuantity = supplyDTO.getSupplyItems().stream()
                .mapToInt(SupplyItemDTO::getQuantity)
                .sum();

        for (SupplyItemDTO supplyItemDTO : supplyDTO.getSupplyItems()) {

            VendorSupply vendorSupply = VendorSupply.builder()
                    .vendorId(supplyDTO.getVendorId())
                    .productName(supplyItemDTO.getProductName().toUpperCase())
                    .date(dateTime)
                    .quantity(supplyItemDTO.getQuantity())
                    .InboundCo2eEmission(((double) supplyItemDTO.getQuantity()/totalQuantity) * predictedInboundTransportationCo2eEmission)
                    .build();

            vendorSupplyRepository.save(vendorSupply);

        }

        return supplyDTO;

    }
}
