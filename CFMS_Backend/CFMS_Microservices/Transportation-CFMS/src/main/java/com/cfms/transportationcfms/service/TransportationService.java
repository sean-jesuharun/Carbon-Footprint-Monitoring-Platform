package com.cfms.transportationcfms.service;

import com.cfms.transportationcfms.dto.TransportInventoryResDTO;
import com.cfms.transportationcfms.dto.TransportationDataDTO;
import com.cfms.transportationcfms.dto.TransportationResDTO;
import com.cfms.transportationcfms.entity.Transportation;
import com.cfms.transportationcfms.entity.TransportationInventory;
import com.cfms.transportationcfms.repository.TransportationInventoryRepository;
import com.cfms.transportationcfms.repository.TransportationRepository;
import com.cfms.transportationcfms.repository.VehicleRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransportationService {

    private TransportationRepository transportationRepository;
    private TransportationInventoryService transportationInventoryService;
    private TransportationEmissionService transportationEmissionService;
    private VehicleRepository vehicleRepository;
    private ModelMapper modelMapper;

    @Autowired
    public TransportationService(TransportationRepository transportationRepository, TransportationInventoryService transportationInventoryService, TransportationEmissionService transportationEmissionService, VehicleRepository vehicleRepository, ModelMapper modelMapper) {
        this.transportationRepository = transportationRepository;
        this.transportationInventoryService = transportationInventoryService;
        this.transportationEmissionService = transportationEmissionService;
        this.vehicleRepository = vehicleRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    // Adding New Transportation
    public void addNewTransportation(TransportationDataDTO transportationDataDTO) {

        // Building Transportation entity to save in database.
        Transportation transportation = Transportation.builder()
                .vehicle(vehicleRepository.findById(transportationDataDTO.getVehicleId()).get())
                .date(transportationDataDTO.getDate())
                .fuelType(transportationDataDTO.getFuelType())
                .fuelConsumption(transportationDataDTO.getFuelConsumption())
                .transportationType(transportationDataDTO.getTransportationType())
                .vendor(transportationDataDTO.getVendor())
                .build();

        // Predicting Transportation Emission.
        Integer predictedTransportationCo2Emission = transportationEmissionService.predictProductionEmission(transportation.getVehicle().getModel().getModel(), transportation.getVehicle().getEngineSize(), transportation.getVehicle().getCylinders(), transportation.getFuelConsumption(), transportation.getVehicle().getVehicleType(), transportation.getFuelType());

        // Assigning the predicted CO2e Emission for the Transportation
        // Changing Integer predictedTransportationCo2Emission to Double.
        transportation.setCo2eEmission(predictedTransportationCo2Emission.doubleValue());

        // Saving Transportation
        transportationRepository.save(transportation);

        // Update TransportInventory
        transportationInventoryService.addTransportationInventory(transportationDataDTO.getTransportInventoryDetailList(), transportation);

    }

    // Fetching all transportation Details.
    public List<TransportationResDTO> getAllTransportationDetails() {

        // Creating a list for storing Transportation details.
        List<TransportationResDTO> transportationResDTOList = new ArrayList<>();

        // Fetching all Transportation and mapping those to TransportationResDTO.
        for (Transportation transportation: transportationRepository.findAll()){
            TransportationResDTO transportationResDTO = modelMapper.map(transportation, TransportationResDTO.class);
            transportationResDTOList.add(transportationResDTO);
        }

        return  transportationResDTOList;

    }

}
