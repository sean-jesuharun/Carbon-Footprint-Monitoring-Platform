package com.cfms.productioncfms.controller;

import com.cfms.productioncfms.dto.ProductionDTO;
import com.cfms.productioncfms.dto.ProductionInventoryCo2eDTO;
import com.cfms.productioncfms.service.ProductionService;
import com.cfms.productioncfms.service.VendorSupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("production")
public class ProductionController {

    private ProductionService productionService;

    private VendorSupplyService vendorSupplyService;

    @Autowired
    public ProductionController(ProductionService productionService, VendorSupplyService vendorSupplyService) {
        this.productionService = productionService;
        this.vendorSupplyService = vendorSupplyService;
    }

    @PostMapping("productionData")
    @ResponseStatus(HttpStatus.CREATED)
    public String productionDataProcess(@RequestBody ProductionDTO productionDTO){
        productionService.processProduction(productionDTO);
        return"Success";
    }


    @PostMapping("co2eEmission/{product_name}")
    @ResponseStatus(HttpStatus.OK)
    public ProductionInventoryCo2eDTO getProductTransportationEmission(@PathVariable("product_name") String productName){

        return vendorSupplyService.getInventoryProductionEmission(productName);

    }

}
