package com.cfms.transportationcfms.controller;

import com.cfms.transportationcfms.dto.TransportationDTO;
import com.cfms.transportationcfms.service.TransportationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("transportation")
public class TransportationController {
    private TransportationService transportationService;

    @Autowired
    public TransportationController(TransportationService transportationService) {
        this.transportationService = transportationService;
    }

    @PostMapping(value = {"transportationData/{vehicle_id}/{transport_inventory}", "transportationData/{vehicle_id}/{transport_inventory}/{vendor_id}"})
    @ResponseStatus(HttpStatus.CREATED)
    public String transportationDataProcess(@PathVariable("vehicle_id") Long vehicleId, @PathVariable("transport_inventory") String transportInventory, @PathVariable(value = "vendor_id", required = false) String vendor, @RequestBody TransportationDTO transportationDTO){
        transportationService.processTransportation(vehicleId, transportInventory, vendor, transportationDTO);
        return"Success";
    }

}
