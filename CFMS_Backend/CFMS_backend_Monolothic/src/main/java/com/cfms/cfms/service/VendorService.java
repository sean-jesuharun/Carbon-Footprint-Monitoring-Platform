package com.cfms.cfms.service;

import com.cfms.cfms.entity.Vendor;
import com.cfms.cfms.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VendorService {

    private VendorRepository vendorRepository;

    @Autowired
    public VendorService(VendorRepository vendorRepository) {
        this.vendorRepository = vendorRepository;
    }

    public Optional<Vendor> getVendor(Long id){
        return vendorRepository.findById(id);
    }
}
