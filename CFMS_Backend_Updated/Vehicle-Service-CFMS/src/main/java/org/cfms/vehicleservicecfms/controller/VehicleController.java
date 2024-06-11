package org.cfms.vehicleservicecfms.controller;

import jakarta.validation.Valid;
import org.cfms.vehicleservicecfms.dto.VehicleDTO;
import org.cfms.vehicleservicecfms.service.implemetation.VehicleServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("vehicles")
@CrossOrigin
public class VehicleController extends AbstractController {

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
    public ResponseEntity<Object> createVehicle(@Valid @RequestBody VehicleDTO vehicleDTO){
        return handleSuccessfulCreatedResponse(vehicleServiceImple.createVehicle(vehicleDTO));
    }

    @GetMapping("{vehicleId}")
    public ResponseEntity<Object> getVehicleById(@PathVariable("vehicleId") Long vehicleId){
        return handleSuccessfulOkResponse(vehicleServiceImple.getVehicleById(vehicleId));
    }

}
