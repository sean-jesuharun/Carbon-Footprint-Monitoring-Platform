package com.cfms.cfms.controller;

import com.cfms.cfms.dto.TransportationEmissionData;
import com.cfms.cfms.entity.Transportation;
import com.cfms.cfms.service.TransportationService;
import com.cfms.cfms.service.VehicleService;
import com.cfms.cfms.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@RestController
public class TransportationController {

    private WebClient.Builder webClientBuilder;
    private VehicleService vehicleService;
    private VendorService vendorService;

    private TransportationService transportationService;

    @Autowired
    public TransportationController(WebClient.Builder webClientBuilder, VehicleService vehicleService, VendorService vendorService, TransportationService transportationService) {
        this.webClientBuilder = webClientBuilder;
        this.vehicleService = vehicleService;
        this.vendorService = vendorService;
        this.transportationService = transportationService;
    }

    @PostMapping("/transportationData/{vehicle_id}/{vendor_id}")
    public ResponseEntity<Integer> transportationDataProcess(@PathVariable("vehicle_id") Long vehicle_id, @PathVariable("vendor_id") Long vendor_id, @RequestBody Transportation transportation){

        // Setting vehicle for the Transportation.
        transportation.setVehicle(vehicleService.getVehicle(vehicle_id));
        // Setting vendor for the Transportation.
        transportation.setVendor(vendorService.getVendor(vendor_id));

        // Create a WebClient instance using the WebClientBuilder.
        // Deployed flask API endpoint url.
        WebClient webClient = webClientBuilder.baseUrl("https://cfms-model.el.r.appspot.com").build();

        // Local flask API server url.
        //WebClient webClient = webClientBuilder.baseUrl("http://127.0.0.1:5000").build();

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
                .body(BodyInserters.fromValue(new TransportationEmissionData(transportation.getVehicle().getModel().getModel(),transportation.getVehicle().getEngine_size(), transportation.getVehicle().getCylinders(), transportation.getFuel_consumption(), transportation.getVehicle().getVehicle_class(), transportation.getFuel_type())))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Integer>>() {})
                .map(response -> response.get("co2Emission"))
                .block();

        // After CO2e Prediction of Transportation save the Transportation Details to the DB.
        transportationService.saveTransportation(transportation);

        // Return the response received from Flask endpoint to the client
        return ResponseEntity.ok(predictedTransportationCo2Emission);

    }

}
