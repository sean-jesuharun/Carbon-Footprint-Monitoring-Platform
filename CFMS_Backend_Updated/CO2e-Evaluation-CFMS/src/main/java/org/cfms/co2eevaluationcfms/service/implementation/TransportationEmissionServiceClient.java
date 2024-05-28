package org.cfms.co2eevaluationcfms.service.implementation;


import org.cfms.co2eevaluationcfms.dto.TransportationEmissionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class TransportationEmissionServiceClient {

    private WebClient webClient;

    @Autowired
    public TransportationEmissionServiceClient(WebClient.Builder webClientBuilderSample) {
//        this.webClient = webClientBuilder.baseUrl("https://cfms-model.el.r.appspot.com").build();
        this.webClient = webClientBuilderSample.baseUrl("http://127.0.0.1:5000").build();
    }

    // Predicting Transportation Emission.
    public Integer predictTransportationEmission(String vehicleModel, double engineSize, int cylinders, double fuelConsumption, String vehicleType, String fuelType){

        // Building TransportationEmissionDTO Object
        TransportationEmissionDTO transportationEmissionDTO = TransportationEmissionDTO.builder()
                .vehicleModel(vehicleModel)
                .engineSize(engineSize)
                .cylinders(cylinders)
                .fuelConsumption(fuelConsumption)
                .vehicleClass(vehicleType)
                .fuelType(fuelType)
                .build();

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
                .body(BodyInserters.fromValue(transportationEmissionDTO))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Integer>>() {})
                .map(response -> response.get("co2Emission"))
                .block();

        return  predictedTransportationCO2eEmission;

    }

}
