package org.cfms.vehicleservicecfms.controller;

import jakarta.validation.Valid;
import org.cfms.vehicleservicecfms.dto.VehicleDTO;
import org.cfms.vehicleservicecfms.service.implemetation.VehicleServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vehicles")
@CrossOrigin
public class VehicleController extends AbstractController {

    private VehicleServiceImple vehicleServiceImple;

    @Autowired
    public VehicleController(VehicleServiceImple vehicleServiceImple) {
        this.vehicleServiceImple = vehicleServiceImple;
    }

//    @GetMapping
//    public ResponseEntity<Object> getVehicles(
//            @RequestParam("pageNo") Integer pageNo,
//            @RequestParam("pageSize") Integer pageSize){
//        return handleSuccessfulOkResponse(vehicleServiceImple.getVehicles(PageRequest.of(pageNo, pageSize)));
//    }

    @GetMapping
    public ResponseEntity<Object> getVehicles(){
        return handleSuccessfulOkResponse(vehicleServiceImple.getVehicles());
    }

    @PostMapping
    public ResponseEntity<Object> createVehicle(@Valid @RequestBody VehicleDTO vehicleDTO){
        return handleSuccessfulCreatedResponse(vehicleServiceImple.createVehicle(vehicleDTO));
    }

    @GetMapping("{vehicleId}")
    public ResponseEntity<Object> getVehicleById(@PathVariable("vehicleId") Long vehicleId){
        return handleSuccessfulOkResponse(vehicleServiceImple.getVehicleById(vehicleId));
    }


    @PutMapping("{vehicleId}")
    public ResponseEntity<Object> updateVehicleById(@PathVariable("vehicleId") Long vehicleId, @Valid @RequestBody VehicleDTO vehicleDTO){
        return handleSuccessfulOkResponse(vehicleServiceImple.updateVehicleById(vehicleId, vehicleDTO));
    }

    @DeleteMapping("{vehicleId}")
    public ResponseEntity<HttpStatus> deleteVehicleById(@PathVariable("vehicleId") Long vehicleId){
        vehicleServiceImple.deleteVehicleById(vehicleId);
        return handleSuccessfulNoContentResponse();
    }


}
