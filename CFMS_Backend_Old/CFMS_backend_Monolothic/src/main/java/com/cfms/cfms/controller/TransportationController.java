package com.cfms.cfms.controller;

import com.cfms.cfms.dto.TransportationDTO;
import com.cfms.cfms.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
public class TransportationController {
    private TransportationService transportationService;

    @Autowired
    public TransportationController(TransportationService transportationService) {
        this.transportationService = transportationService;
    }

    @PostMapping(value = {"/transportationData/{vehicle_id}/{transport_inventory}", "/transportationData/{vehicle_id}/{transport_inventory}/{vendor_id}"})
    @ResponseStatus(HttpStatus.CREATED)
    public String transportationDataProcess(@PathVariable("vehicle_id") Long vehicleId, @PathVariable("transport_inventory") String transportInventory, @PathVariable(value = "vendor_id", required = false) Long vendorId, @RequestBody TransportationDTO transportationDto){
        transportationService.processTransportation(vehicleId, transportInventory, vendorId, transportationDto);
        return"Success";
    }

}
