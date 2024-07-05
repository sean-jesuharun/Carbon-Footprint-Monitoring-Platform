package com.cfms.transportationcfms.service;

import com.cfms.transportationcfms.dto.TransportationEmissionDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class TransportationEmissionService {

    private WebClient.Builder webClientBuilder;

    @Autowired
    public TransportationEmissionService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    // Predicting Transportation Emission.
    public Integer predictProductionEmission(String vehicleModel, double engineSize, int cylinders, double fuelConsumption, String vehicleType, String fuelType){

        // Building TransportationEmissionDataDTO Object
        TransportationEmissionDataDTO transportationEmissionDataDTO = TransportationEmissionDataDTO.builder()
                .vehicleModel(vehicleModel)
                .engineSize(engineSize)
                .cylinders(cylinders)
                .fuelConsumption(fuelConsumption)
                .vehicleClass(vehicleType)
                .fuelType(fuelType)
                .build();

        // Create a WebClient instance using the WebClientBuilder.
        // Deployed flask API endpoint url.
        WebClient webClient = webClientBuilder.baseUrl("https://cfms-model.el.r.appspot.com").build();

        // Local flask API server url.
        //WebClient webClient = webClientBuilder.baseUrl("http://127.0.0.1:5000").build();

        // Send a POST request to the "/transportationEmissionPrediction" endpoint.
        // Set the content type of the request body to JSON.
        // Serialize the 'transportationEmissionDataDTO' object and include it in the request body.
        // Retrieve the response from the server.
        // Deserializing the JSON response into a Map<String, Integer> using ParameterizedTypeReference
        // Mapping the response to extract the 'co2Emission' value from the map
        // Blocking the execution until the response is received.
        Integer predictedTransportationCO2eEmission = webClient.post()
                .uri("/transportationEmissionPrediction")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(transportationEmissionDataDTO))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Integer>>() {})
                .map(response -> response.get("co2Emission"))
                .block();

        return  predictedTransportationCO2eEmission;

    }

}
