package com.cfms.transportationcfms.service;


import com.cfms.transportationcfms.entity.Vehicle;
import com.cfms.transportationcfms.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
