package com.cfms.transportationcfms.controller;

import com.cfms.transportationcfms.dto.TransportInventoryResDTO;
import com.cfms.transportationcfms.service.TransportationInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("transportInventories")
@CrossOrigin
public class TransportationInventoryController {

    private TransportationInventoryService transportationInventoryService;

    @Autowired
    public TransportationInventoryController(TransportationInventoryService transportationInventoryService) {
        this.transportationInventoryService = transportationInventoryService;
    }

    // Retrieve Transport Details of a particular Product.
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<TransportInventoryResDTO> retrieveTransportInventories(@RequestParam(name = "productName", required = false) String productName, @RequestParam(name = "vendorName", required = false) String vendorName){
        return transportationInventoryService.retrieveTransportInventories(productName, vendorName);
    }


//    @PostMapping("co2eEmission/{product_name}")
//    @ResponseStatus(HttpStatus.OK)
//    public TransportationInventoryCo2eDTO getProductTransportationEmission(@PathVariable("product_name") String productName){
//
//        return transportationInventoryService.getProductTransportationEmission(productName);
//
//    }

}
