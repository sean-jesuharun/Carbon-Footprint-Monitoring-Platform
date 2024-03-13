package com.cfms.cfms.controller;

import com.cfms.cfms.dto.TransportationEmissionData;
import com.cfms.cfms.entity.Transportation;
import com.cfms.cfms.entity.TransportationInventory;
import com.cfms.cfms.entity.TransportationInventoryKey;
import com.cfms.cfms.service.*;
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

import java.util.HashMap;
import java.util.Map;

@RestController
public class TransportationController {

    private WebClient.Builder webClientBuilder;
    private VehicleService vehicleService;
    private VendorService vendorService;
    private InventoryService inventoryService;
    private TransportationInventoryService transportationInventoryService;
    private TransportationService transportationService;

    @Autowired
    public TransportationController(WebClient.Builder webClientBuilder, VehicleService vehicleService, VendorService vendorService, InventoryService inventoryService, TransportationInventoryService transportationInventoryService, TransportationService transportationService) {
        this.webClientBuilder = webClientBuilder;
        this.vehicleService = vehicleService;
        this.vendorService = vendorService;
        this.inventoryService = inventoryService;
        this.transportationInventoryService = transportationInventoryService;
        this.transportationService = transportationService;
    }

    @PostMapping(value = {"/transportationData/{vehicle_id}/{transport_inventory}", "/transportationData/{vehicle_id}/{transport_inventory}/{vendor_id}"})
    public ResponseEntity<Integer> transportationDataProcess(@PathVariable("vehicle_id") Long vehicle_id, @PathVariable("transport_inventory") String transportInventory, @PathVariable(value = "vendor_id", required = false) Long vendor_id, @RequestBody Transportation transportation){

        // Setting vehicle for the Transportation.
        transportation.setVehicle(vehicleService.getVehicle(vehicle_id));

        // Checking whether the Transportation is INBOUND or OUTBOUND
        if (vendor_id != null) {
            // Setting vendor for the Transportation.
            transportation.setVendor(vendorService.getVendor(vendor_id));
        }

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


        // Saving Transportation
        transportation = transportationService.saveTransportation(transportation);

        // Map the transportInventory with the related Quantities of their transport
        Map<Long, Integer> transportInventoriesQuantityList = parseTransportInventoryString(transportInventory);

        for(Long productId : transportInventoriesQuantityList.keySet()){

            // Creating TransportationInventoryKey (composite key) & Transient TransportationInventory Entity
            // Saving TransportationInventory
            transportationInventoryService.saveTransportationInventory(new TransportationInventory(new TransportationInventoryKey(transportation, inventoryService.getInventory(productId)), transportInventoriesQuantityList.get(productId)));

        }

        // Return the response received from Flask endpoint to the client
        return ResponseEntity.ok(predictedTransportationCo2Emission);

    }

    // Converting the String of transport_inventory to Map <Long, Integer> inventory_id, Quantity
    private Map<Long, Integer> parseTransportInventoryString(String propertyIds) {
        Map<Long, Integer> result = new HashMap<>();
        String[] pairs = propertyIds.split(",");
        for (String pair : pairs) {
            String[] keyValue = pair.split("=");
            if (keyValue.length == 2) {
                try {
                    long id = Long.parseLong(keyValue[0]);
                    int quantity = Integer.parseInt(keyValue[1]);
                    result.put(id, quantity);
                } catch (NumberFormatException e) {
                    // Handle parsing error if needed
                }
            }
        }
        return result;
    }

}
