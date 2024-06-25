package org.cfms.vendorservicecfms.controller;

import org.cfms.vendorservicecfms.dto.VendorDTO;
import org.cfms.vendorservicecfms.service.implementation.VendorServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("vendors")
@CrossOrigin
public class VendorController {

    private VendorServiceImple vendorServiceImple;

    @Autowired
    public VendorController(VendorServiceImple vendorServiceImple) {
        this.vendorServiceImple = vendorServiceImple;
    }

    @GetMapping
    public List<VendorDTO> getVendors() {
        return vendorServiceImple.getVendors();
    }

    @PostMapping
    public VendorDTO createVendor(@RequestBody VendorDTO vendorDTO) {
        return vendorServiceImple.createVendor(vendorDTO);
    }

    @GetMapping("{vendorId}")
    public VendorDTO getVendorById(@PathVariable("vendorId") Long vendorId) {
        return vendorServiceImple.getVendorById(vendorId);
    }

    @DeleteMapping("{vendorId}")
    public void deleteVendorById(@PathVariable("vendorId") Long vendorId) {
        vendorServiceImple.deleteVendorById(vendorId);
    }

}
