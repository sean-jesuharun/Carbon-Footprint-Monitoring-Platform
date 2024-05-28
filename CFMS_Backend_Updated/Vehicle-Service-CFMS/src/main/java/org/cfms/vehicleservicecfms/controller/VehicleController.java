package org.cfms.vehicleservicecfms.controller;

import org.cfms.vehicleservicecfms.dto.VehicleDTO;
import org.cfms.vehicleservicecfms.service.implemetation.VehicleServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("vehicles")
public class VehicleController {

    private VehicleServiceImple vehicleServiceImple;

    @Autowired
    public VehicleController(VehicleServiceImple vehicleServiceImple) {
        this.vehicleServiceImple = vehicleServiceImple;
    }

    @GetMapping
    public List<VehicleDTO> getVehicles(){
        return vehicleServiceImple.getVehicles();
    }


    @PostMapping
    public VehicleDTO createVehicle(@RequestBody VehicleDTO vehicleDTO){
        return vehicleServiceImple.createVehicle(vehicleDTO);
    }

    @GetMapping("{vehicleId}")
    public VehicleDTO getVehicleById(@PathVariable("vehicleId") Long vehicleId){
        return vehicleServiceImple.getVehicleById(vehicleId);
    }

}
