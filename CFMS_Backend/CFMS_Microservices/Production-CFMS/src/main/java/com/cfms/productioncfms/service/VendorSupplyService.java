package com.cfms.productioncfms.service;

import com.cfms.productioncfms.dto.ProductionInventoryCo2eDTO;
import com.cfms.productioncfms.entity.ProductionMatrix;
import com.cfms.productioncfms.entity.Vendor;
import com.cfms.productioncfms.entity.VendorSupply;
import com.cfms.productioncfms.entity.VendorSupplyKey;
import com.cfms.productioncfms.repository.VendorSupplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class VendorSupplyService {

    private VendorSupplyRepository vendorSupplyRepository;

    private ProductionKafkaProducerService productionKafkaProducerService;

    @Autowired
    public VendorSupplyService(VendorSupplyRepository vendorSupplyRepository, ProductionKafkaProducerService productionKafkaProducerService) {
        this.vendorSupplyRepository = vendorSupplyRepository;
        this.productionKafkaProducerService = productionKafkaProducerService;
    }

    // Adding Vendor Supply.
    public void addVendorSupply(Vendor vendor, String productName, ProductionMatrix productionMatrix){

        // Creating vendorSupplyKey (composite key) & Transient vendorSupply Entity
        VendorSupply vendorSupply = VendorSupply.builder()
                .vendorSupplyKey(VendorSupplyKey.builder()
                        .vendor(vendor)
                        .productName(productName)
                        .build())
                .productionMatrix(productionMatrix)
                .build();

        // Saving VendorSupply
        saveVendorSupply(vendorSupply);

        // Produce VendorSupplyInventory Data
        productionKafkaProducerService.produceVendorSupplyInventory(vendor.getVendorName(), productName);
    }

    public void saveVendorSupply(VendorSupply vendorSupply){
//       vendorSupplyRepository.saveVendorSupply(vendorSupplyKey.getVendor().getVendorName(), vendorSupplyKey.getProductName());
        vendorSupplyRepository.save(vendorSupply);
    }

    public VendorSupply getVendorSupply(VendorSupplyKey vendorSupplyKey){
        return vendorSupplyRepository.findById(vendorSupplyKey).get();
    }

    public ProductionInventoryCo2eDTO getInventoryProductionEmission(String productName) {

        return vendorSupplyRepository.retrieveInventoryProductionC02eEmissionData(productName);

    }
}
