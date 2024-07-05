package com.cfms.productioncfms.controller;

import com.cfms.productioncfms.dto.VendorSupplyResDTO;
import com.cfms.productioncfms.dto.TransportInventoryQuantityDataDTO;
import com.cfms.productioncfms.entity.VendorSupply;
import com.cfms.productioncfms.service.VendorSupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("supplies")
@CrossOrigin
public class SupplyController {

    private VendorSupplyService vendorSupplyService;

    @Autowired
    public SupplyController(VendorSupplyService vendorSupplyService) {
        this.vendorSupplyService = vendorSupplyService;
    }

    // Retrieve Supply Details
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<VendorSupplyResDTO> retrieveSupplyData(@RequestParam(name = "productName", required = false) String productName, @RequestParam(name = "vendorName", required = false) String vendorName){
        return vendorSupplyService.retrieveSupplyData(productName, vendorName);
    }

    // Update ProductQuantity and Co2eEmission For INBOUND transportation.
    @PatchMapping("{vendorName}/{productName}")
    @ResponseStatus(HttpStatus.OK)
    public void processInboundTransportedProductsProduction(@PathVariable("vendorName") String vendorName, @PathVariable("productName") String productName, @RequestBody TransportInventoryQuantityDataDTO transportInventoryQuantityDataDTO){
        vendorSupplyService.updateQuantityAndCO2eEmission(vendorName, productName, transportInventoryQuantityDataDTO.getQuantity());
    }

//    // Update Inbound Transportation ProductQuantity and Co2eEmission.
//    @PostMapping()
//    @ResponseStatus(HttpStatus.OK)
//    public void productionDataProcess(@RequestBody TransportationDataDTO transportationDataDTO){
//        productionService.processProduction(transportationDataDTO);
//    }

}
