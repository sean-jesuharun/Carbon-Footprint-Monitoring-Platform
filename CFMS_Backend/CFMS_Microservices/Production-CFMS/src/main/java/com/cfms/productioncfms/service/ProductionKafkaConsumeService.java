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

    private ProductionService productionService;

    @Autowired
    public ProductionKafkaConsumeService(ProductionService productionService) {
        this.productionService = productionService;
    }

    @KafkaListener(topics = "transportInventoryQuantity", groupId = "productionEmissionGroup")
    public void consumeTransportedProductData(ConsumerRecord<Long, ProductQuantity> record){

        // Deserialize according to productQuantity Schema.
        ProductQuantity transportedProductData = record.value();

        // Process the Transported Product Data for production purpose.
        productionService.processTransportedProductData(transportedProductData);

    }


}
