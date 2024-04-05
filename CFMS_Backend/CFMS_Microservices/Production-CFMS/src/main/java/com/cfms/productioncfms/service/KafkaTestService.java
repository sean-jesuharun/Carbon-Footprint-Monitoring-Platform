//package com.cfms.productioncfms.service;
//
//import com.cfms.kafka.ProductQuantity;
//import org.apache.kafka.clients.consumer.ConsumerRecord;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//@Service
//public class KafkaTestService {
//
//    @KafkaListener(topics = "transportInventoryQuantity")
//    public void consume(ConsumerRecord<Long, ProductQuantity> record){
//
//        ProductQuantity productQuantity = record.value();
//        System.out.println("Transportation Type : " + productQuantity.getTransportationType());
//        System.out.println("Vendor : " + productQuantity.getVendor());
//        System.out.println("Product Name : " + productQuantity.getProductName());
//        System.out.println("Quantity : " + productQuantity.getQuantity());
//    }
//
//
//}
