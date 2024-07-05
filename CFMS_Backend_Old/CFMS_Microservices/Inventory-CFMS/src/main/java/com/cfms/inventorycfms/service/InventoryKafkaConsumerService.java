package com.cfms.inventorycfms.service;

import com.cfms.kafka.InventoryProduct;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class InventoryKafkaConsumerService {

    private InventoryService inventoryService;

    @Autowired
    public InventoryKafkaConsumerService(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // Consuming Vendor Supply Inventories.
    @KafkaListener(topics = "vendorSupplyInventory",
            groupId = "addNewInventoryGroup",
            properties = {
                    "key.deserializer=org.apache.kafka.common.serialization.StringDeserializer"
            })
    public void consumeVendorSupplyInventory(ConsumerRecord<String, InventoryProduct> record){

        // Deserialize according to inventoryProduct Schema (local).
        InventoryProduct inventoryProduct = record.value();

        // Checking and Adding only New Inventories.
        inventoryService.addNewInventory(inventoryProduct.getProductName().toString());

    }

//    // Consuming Transported Inventory Data.
//    @KafkaListener(topics = "transportInventoryQuantity",
//            groupId = "inventoryUpdateGroup",
//            properties = {
//                    "key.deserializer=org.apache.kafka.common.serialization.LongDeserializer"
//            })
//    public void consumeTransportedProductData(ConsumerRecord<Long, ProductQuantity> record){
//
//        // Deserialize according to ProductQuantity Schema (local).
//        ProductQuantity productQuantity = record.value();
//
//        // Update quantity in hand of Inventories.
//        inventoryService.updateInventoryQuantity(productQuantity.getTransportationType().toString(), productQuantity.getProductName().toString(), productQuantity.getQuantity());
//
//    }

}
