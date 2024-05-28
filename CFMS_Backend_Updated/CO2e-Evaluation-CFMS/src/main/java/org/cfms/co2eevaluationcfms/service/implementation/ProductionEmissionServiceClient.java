package org.cfms.co2eevaluationcfms.service.implementation;


import org.cfms.co2eevaluationcfms.dto.ProductionEmissionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ProductionEmissionServiceClient {

    private WebClient webClient;

    @Autowired
    public ProductionEmissionServiceClient(WebClient.Builder webClientBuilderSample) {
        this.webClient = webClientBuilderSample.baseUrl("https://live-stock-deployment-2.el.r.appspot.com").build();
    }

    // Prediction Production Emission.
    public double predictProductionEmission(String region, String animalType, String productionSystem, String commodity){

        // (Note) Need to Change This Logic
        List<String> regionList = new ArrayList<>();
        regionList.add(region);
        List<String> animalTypeList = new ArrayList<>();
        animalTypeList.add(animalType);
        List<String> productionSystemList = new ArrayList<>();
        productionSystemList.add(productionSystem);
        List<String> commodityList = new ArrayList<>();
        commodityList.add(commodity);

        // Building the ProductionEmissionDTO.
        ProductionEmissionDTO productionEmissionDTO = ProductionEmissionDTO.builder()
                .region(regionList)
                .animal_type(animalTypeList)
                .production_sys(productionSystemList)
                .commodity(commodityList)
                .build();

//        // (Note) Need to have it in this Format.
//        ProductionEmissionDataDTO productionEmissionDataDTO = ProductionEmissionDataDTO.builder()
//                .region(region)
//                .animal_type(animalType)
//                .production_sys(productionSystem)
//                .commodity(commodity)
//                .build();

        // Send a POST request to the "/predict" endpoint.
        // Set the content type of the request body to JSON.
        // Serialize the 'transportation' object and include it in the request body.
        // Retrieve the response from the server.
        // Deserializing the JSON response into a Map<String, List<Double>> using ParameterizedTypeReference
        // Mapping the response to extract the 'predicted_emission_intensity' value from the map
        // Blocking the execution until the response is received.
        Double predictedProductionCO2eEmissionPerKg = webClient.post()
                .uri("/predict")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(productionEmissionDTO))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, List<Double>>>() {})
                .map(response -> response.get("predicted_emission_intensity"))
                .block().get(0);

        return predictedProductionCO2eEmissionPerKg;
    }

}
