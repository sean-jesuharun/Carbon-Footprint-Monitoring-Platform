package com.cfms.productioncfms.controller;

import com.cfms.productioncfms.dto.VendorDTO;
import com.cfms.productioncfms.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vendor")
public class VendorController {

    private VendorService vendorService;

    @Autowired
    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }

    @PostMapping("addVendor")
    @ResponseStatus(HttpStatus.CREATED)
    public String addVendor(@RequestBody VendorDTO vendorDTO){
        vendorService.addNewVendor(vendorDTO);
        return "Success";
    }
}
