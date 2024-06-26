package org.cfms.vehicleservicecfms.service.implemetation;

import jakarta.transaction.Transactional;
import org.cfms.vehicleservicecfms.dto.VehicleDTO;
import org.cfms.vehicleservicecfms.entity.Vehicle;
import org.cfms.vehicleservicecfms.exception.VehicleNotFoundException;
import org.cfms.vehicleservicecfms.repository.VehicleRepository;
import org.cfms.vehicleservicecfms.service.VehicleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImple implements VehicleService {

    private VehicleRepository vehicleRepository;

    private ModelMapper modelMapper;

    @Autowired
    public VehicleServiceImple(VehicleRepository vehicleRepository, ModelMapper modelMapper) {
        this.vehicleRepository = vehicleRepository;
        this.modelMapper = modelMapper;
    }

    public List<VehicleDTO> getVehicles() {

        return vehicleRepository.findAll().stream()
                .map(vehicle -> modelMapper.map(vehicle, VehicleDTO.class))
                .toList();

    }

    @Transactional
    public VehicleDTO createVehicle(VehicleDTO vehicleDTO) {

        Vehicle vehicle = Vehicle.builder()
                .model(vehicleDTO.getModel())
                .engineSize(vehicleDTO.getEngineSize())
                .cylinders(vehicleDTO.getCylinders())
                .fuelType(vehicleDTO.getFuelType())
                .vehicleType(vehicleDTO.getVehicleType())
                .transmission(vehicleDTO.getTransmission())
                .build();

        vehicleRepository.save(vehicle);

        return modelMapper.map(vehicle, VehicleDTO.class);

    }

    public VehicleDTO getVehicleById(Long vehicleId) {

        return vehicleRepository.findById(vehicleId)
                .map(vehicle -> modelMapper.map(vehicle, VehicleDTO.class))
                .orElseThrow(() -> new VehicleNotFoundException("Vehicle not found with Id : " + vehicleId));

    }

    @Transactional
    public VehicleDTO updateVehicleById(Long vehicleId, VehicleDTO vehicleDTO) {

        return vehicleRepository.findById(vehicleId)
                .map(vehicle -> {

                    vehicle.setModel(vehicleDTO.getModel());
                    vehicle.setEngineSize(vehicleDTO.getEngineSize());
                    vehicle.setCylinders(vehicleDTO.getCylinders());
                    vehicle.setFuelType(vehicleDTO.getFuelType());
                    vehicle.setVehicleType(vehicleDTO.getVehicleType());
                    vehicle.setTransmission(vehicleDTO.getTransmission());

                    return modelMapper.map(vehicle, VehicleDTO.class);

                })
                .orElseThrow(() -> new VehicleNotFoundException("Vehicle not found with Id : " + vehicleId));

    }


    public void deleteVehicleById(Long vehicleId) {

        vehicleRepository.deleteById(vehicleId);

    }
}
