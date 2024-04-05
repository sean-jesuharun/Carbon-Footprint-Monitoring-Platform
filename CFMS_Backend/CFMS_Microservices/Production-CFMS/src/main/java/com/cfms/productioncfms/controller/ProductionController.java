package com.cfms.productioncfms.controller;

import com.cfms.productioncfms.dto.VendorDTO;
import com.cfms.productioncfms.service.ProductionService;
import com.cfms.productioncfms.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("production")
public class ProductionController {

    private ProductionService productionService;

    private VendorService vendorService;

    public ProductionController(ProductionService productionService, VendorService vendorService) {
        this.productionService = productionService;
        this.vendorService = vendorService;
    }

    @PostMapping("addVendor")
    @ResponseStatus(HttpStatus.CREATED)
    public String addVendor(@RequestBody VendorDTO vendorDTO){
//        productionService.addNewVendor(vendorDTO);
        vendorService.addNewVendor(vendorDTO);
        return "Success";
    }
}
