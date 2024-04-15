package com.cfms.transportationcfms.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class Config {

    // Creating a Bean Of WebClient Builder.
    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

}
