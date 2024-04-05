package com.cfms.productioncfms.service;

import com.cfms.productioncfms.dto.ProductionMatrixDTO;
import com.cfms.productioncfms.dto.VendorDTO;
import com.cfms.productioncfms.entity.ProductionMatrix;
import com.cfms.productioncfms.entity.Vendor;
import com.cfms.productioncfms.entity.VendorSupply;
import com.cfms.productioncfms.entity.VendorSupplyKey;
import com.cfms.productioncfms.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendorService {

    private VendorRepository vendorRepository;

    private ProductionMatrixService productionMatrixService;

    @Autowired
    public VendorService(VendorRepository vendorRepository, ProductionMatrixService productionMatrixService) {
        this.vendorRepository = vendorRepository;
        this.productionMatrixService = productionMatrixService;
    }

    // Adding a New Vendor Details.
    public void addNewVendor(VendorDTO vendorDTO) {

        // Building Vendor entity to save in database
        Vendor vendor = Vendor.builder()
                .vendorName(vendorDTO.getVendorName())
                .location(vendorDTO.getLocation())
                .build();

        // Saving New Vendor.
        vendor = saveVendor(vendor);

        // Adding New ProductionMatrix if available.
        productionMatrixService.addProductionMatrix(vendorDTO.getProductList(), vendor);

    }



    public Vendor saveVendor(Vendor vendor){
        return vendorRepository.save(vendor);
    }

    public Vendor getVendor(String vendorName){
        return vendorRepository.findById(vendorName).get();
    }
}
