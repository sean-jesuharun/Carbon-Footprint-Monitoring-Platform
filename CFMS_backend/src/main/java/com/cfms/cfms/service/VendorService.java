package com.cfms.cfms.service;

import com.cfms.cfms.entity.Vendor;
import com.cfms.cfms.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendorService {

    private VendorRepository vendorRepository;

    @Autowired
    public VendorService(VendorRepository vendorRepository) {
        this.vendorRepository = vendorRepository;
    }

    public Vendor getVendor(Long id){
        return vendorRepository.getReferenceById(id);
    }
}
