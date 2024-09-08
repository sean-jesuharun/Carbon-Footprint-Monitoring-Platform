package com.cfms.transportationcfms.controller;

import com.cfms.transportationcfms.dto.TransportationDataDTO;
import com.cfms.transportationcfms.dto.TransportationResDTO;
import com.cfms.transportationcfms.service.TransportationInventoryService;
import com.cfms.transportationcfms.service.TransportationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("transportation")
@CrossOrigin
public class TransportationController {
    private TransportationService transportationService;

    @Autowired
    public TransportationController(TransportationService transportationService) {
        this.transportationService = transportationService;
    }

    // Retrieve all Transportation Details.
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<TransportationResDTO> getAllTransportation(){
        return transportationService.getAllTransportationDetails();
    }

    // Add a new Transportation.
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public void processTransportationData(@RequestBody TransportationDataDTO transportationDataDTO){
        transportationService.addNewTransportation(transportationDataDTO);
    }


}
