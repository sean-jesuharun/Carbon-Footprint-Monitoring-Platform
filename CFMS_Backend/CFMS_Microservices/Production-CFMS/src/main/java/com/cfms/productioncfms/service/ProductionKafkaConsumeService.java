package com.cfms.productioncfms.service;

import com.cfms.kafka.ProductQuantity;
import com.cfms.productioncfms.dto.ProductionEmissionDTO;
import com.cfms.productioncfms.entity.ProductionMatrix;
import com.cfms.productioncfms.entity.VendorSupply;
import com.cfms.productioncfms.entity.VendorSupplyKey;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ProductionKafkaConsumeService {

    private VendorSupplyService vendorSupplyService;

    private VendorService vendorService;

    private ProductionMatrixService productionMatrixService;

    private ProductionEmissionService productionEmissionService;

    @Autowired
    public ProductionKafkaConsumeService(VendorSupplyService vendorSupplyService, VendorService vendorService, ProductionMatrixService productionMatrixService, ProductionEmissionService productionEmissionService) {
        this.vendorSupplyService = vendorSupplyService;
        this.vendorService = vendorService;
        this.productionMatrixService = productionMatrixService;
        this.productionEmissionService = productionEmissionService;
    }

    @KafkaListener(topics = "transportInventoryQuantity", groupId = "productionEmissionGroup")
    public void consumeTransportedProductData(ConsumerRecord<Long, ProductQuantity> record){

        // Deserialize according to productQuantity Schema.
        ProductQuantity productQuantity = record.value();

        // Process the Transported Product Data for production purpose.
        processTransportedProductData(productQuantity);

    }

    // Process the Transported Product Data for production Purposes.
    public void processTransportedProductData(ProductQuantity productQuantity){

        // Convert transportationType from Utf8 to String.
        String transportationType = productQuantity.getTransportationType().toString();

        if (transportationType.equals("INBOUND")){

            // Retrieving the VendorSupply from the DataBase using VendorSupplyKey.
            VendorSupply vendorSupply = vendorSupplyService.getVendorSupply(VendorSupplyKey.builder()
                            .vendor(vendorService.getVendor(productQuantity.getVendor().toString()))
                            .productName(productQuantity.getProductName().toString())
                            .build());

            // Retrieving the ProductionMatrix Details of the relevant VendorSupply
            ProductionMatrix productionMatrix = productionMatrixService.getProductionMatrix(vendorSupply.getProductionMatrix().getProductionMatrixId());

            // Predicting Production Emission.
            double predictedProductionCO2Emission = productionEmissionService.predictProductionEmission(productionMatrix.getRegion(), productionMatrix.getAnimalSpecies(), productionMatrix.getProductionSystem(), productionMatrix.getCommodity());

            // Updating Product Supplied Quantity
            vendorSupply.setSuppliedQuantity(vendorSupply.getSuppliedQuantity() + productQuantity.getQuantity());

            // Updating Production Emission.
            vendorSupply.setCo2eEmission(vendorSupply.getCo2eEmission() + predictedProductionCO2Emission);

            // Saving the Updated vendor Supply with added Emission and Quantity Details.
            vendorSupplyService.saveVendorSupply(vendorSupply);
        }

    }

}
