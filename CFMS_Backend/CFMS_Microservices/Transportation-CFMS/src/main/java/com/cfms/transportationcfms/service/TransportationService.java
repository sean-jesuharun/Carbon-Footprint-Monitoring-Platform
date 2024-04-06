package com.cfms.transportationcfms.service;

import com.cfms.transportationcfms.dto.TransportationDTO;
import com.cfms.transportationcfms.entity.Transportation;
import com.cfms.transportationcfms.repository.TransportationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransportationService {

    private TransportationRepository transportationRepository;

    private VehicleService vehicleService;

    private TransportationInventoryService transportationInventoryService;

    private TransportationEmissionService transportationEmissionService;


    @Autowired
    public TransportationService(TransportationRepository transportationRepository, VehicleService vehicleService, TransportationInventoryService transportationInventoryService, TransportationEmissionService transportationEmissionService) {
        this.transportationRepository = transportationRepository;
        this.vehicleService = vehicleService;
        this.transportationInventoryService = transportationInventoryService;
        this.transportationEmissionService = transportationEmissionService;
    }

    public void processTransportation(Long vehicleId, String transportInventory, String vendor, TransportationDTO transportationDTO) {

        // Building Transportation entity to save in database.
        Transportation transportation = Transportation.builder()
                .vehicle(vehicleService.getVehicle(vehicleId))
                .date(transportationDTO.getDate())
                .fuelType(transportationDTO.getFuelType())
                .fuelConsumption(transportationDTO.getFuelConsumption())
                .transportationType(transportationDTO.getTransportationType())
                .vendor(vendor)
                .build();

        // Predicting Transportation Emission.
        Integer predictedTransportationCo2Emission = transportationEmissionService.predictProductionEmission(transportation.getVehicle().getModel().getModel(), transportation.getVehicle().getEngineSize(), transportation.getVehicle().getCylinders(), transportation.getFuelConsumption(), transportation.getVehicle().getVehicleType(), transportation.getFuelType());

        // Assigning the predicted CO2e Emission for the Transportation
        transportation.setCo2eEmission(predictedTransportationCo2Emission);

        // Saving Transportation
        transportation = saveTransportation(transportation);

        // Update TransportInventory
        transportationInventoryService.addTransportationInventory(transportInventory, transportation);

    }

    // Save Transportation
    public Transportation saveTransportation(Transportation transportation){
        return transportationRepository.save(transportation);
    }


}
