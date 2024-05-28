package com.cfms.productioncfms.controller;

import com.cfms.productioncfms.dto.VendorResDTO;
import com.cfms.productioncfms.dto.VendorDataDTO;
import com.cfms.productioncfms.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("vendors")
@CrossOrigin
public class VendorController {

    private VendorService vendorService;

    @Autowired
    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }

    // Add a new Vendor.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addVendor(@RequestBody VendorDataDTO vendorDataDTO){
        vendorService.addNewVendor(vendorDataDTO);
    }

    // Retrieve all Vendors Details.
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<VendorResDTO> getAllVendors(){
        return vendorService.getAllVendorDetails();
    }

    // Update an existing vendor.
    @PutMapping("{vendorId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateVendor(@PathVariable("vendorId") Long vendorId, @RequestBody VendorDataDTO vendorDataDTO){
        vendorService.updateVendor(vendorId, vendorDataDTO);
    }

}
