package com.cfms.cfms.service;

import com.cfms.cfms.entity.Vehicle;
import com.cfms.cfms.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VehicleService {

    private VehicleRepository vehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository){
        this.vehicleRepository = vehicleRepository;
    }

    public Vehicle getVehicle(Long id){
        return vehicleRepository.getReferenceById(id);
    }

}
