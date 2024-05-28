package com.cfms.productioncfms.service;

import com.cfms.kafka.InventoryProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProductionKafkaProducerService {

    private KafkaTemplate<String, InventoryProduct> kafkaTemplate;

    @Autowired
    public ProductionKafkaProducerService(KafkaTemplate<String, InventoryProduct> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    // Produce VendorSupplyInventory Data
    public void produceVendorSupplyInventory(String vendorName, String productName){

        // Building the inventoryProduct Object to stream over Kafka.
        InventoryProduct inventoryProduct = InventoryProduct.newBuilder()
                .setProductName(productName)
                .build();

        // Producing Kafka message.
        kafkaTemplate.send("vendorSupplyInventory", vendorName, inventoryProduct);

    }

}
