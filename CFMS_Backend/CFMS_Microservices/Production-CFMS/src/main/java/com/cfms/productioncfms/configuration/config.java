package com.cfms.productioncfms.configuration;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class config {

    // Creating a Bean Of WebClient Builder.
    @Bean
    public WebClient.Builder webClientBuilder(){
        return WebClient.builder();
    }

    // Creating a Kafka Topic called "vendorSupplyInventory"
    @Bean
    public NewTopic vendorSupplyInventory(){
        return TopicBuilder.name("vendorSupplyInventory")
                .build();
    }

}
