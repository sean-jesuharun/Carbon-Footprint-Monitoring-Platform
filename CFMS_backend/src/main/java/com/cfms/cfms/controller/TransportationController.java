package com.cfms.cfms.controller;

import com.cfms.cfms.model.Transportation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@RestController
public class TransportationController {

    private WebClient.Builder webClientBuilder;

    @Autowired
    public TransportationController(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    @PostMapping("/transportationData")
    public ResponseEntity<Integer> transportationDataProcess(@RequestBody Transportation transportation){

        // Create a WebClient instance using the WebClientBuilder
        WebClient webClient = webClientBuilder.baseUrl("http://127.0.0.1:5000").build();

        // Send a POST request to the "/transportationEmissionPrediction" endpoint.
        // Set the content type of the request body to JSON.
        // Serialize the 'transportation' object and include it in the request body.
        // Retrieve the response from the server.
        // Deserializing the JSON response into a Map<String, Integer> using ParameterizedTypeReference
        // Mapping the response to extract the 'co2Emission' value from the map
        // Blocking the execution until the response is received.
        Integer predictedTransportationCo2Emission = webClient.post()
                .uri("/transportationEmissionPrediction")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(transportation))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Integer>>() {})
                .map(response -> response.get("co2Emission"))
                .block();


        // Return the response received from Flask endpoint to the client
        return ResponseEntity.ok(predictedTransportationCo2Emission);

    }

}
