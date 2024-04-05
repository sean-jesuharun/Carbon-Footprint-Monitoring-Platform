package com.cfms.transportationcfms.configuration;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class Config {

    // Creating a Bean Of WebClient Builder.
    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

    // Creating a Kafka Topic called "transportProductQuantity"
    @Bean
    public NewTopic transportProductQuantity(){
        return TopicBuilder.name("transportInventoryQuantity")
                .build();
    }

}
