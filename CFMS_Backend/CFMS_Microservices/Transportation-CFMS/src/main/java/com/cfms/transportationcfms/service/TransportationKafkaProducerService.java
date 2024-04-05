package com.cfms.transportationcfms.service;

import com.cfms.kafka.ProductQuantity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class TransportationKafkaProducerService {

    private KafkaTemplate<Long, ProductQuantity> kafkaTemplate;

    @Autowired
    public TransportationKafkaProducerService(KafkaTemplate<Long, ProductQuantity> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    // Produce TransportedProduct Data
    public void produceTransportedProductData(Long transportationId, String transportationType, String vendor, String productName, int quantity){

        // Building the ProductQuantity Object to stream over Kafka.
        ProductQuantity productQuantity = ProductQuantity.newBuilder()
                .setTransportationType(transportationType)
                .setVendor(vendor)
                .setProductName(productName)
                .setQuantity(quantity)
                .build();

        // Producing Kafka message.
        kafkaTemplate.send("transportInventoryQuantity", transportationId, productQuantity);

    }

}
