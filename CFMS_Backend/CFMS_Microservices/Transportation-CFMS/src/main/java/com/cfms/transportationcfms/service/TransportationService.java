package com.cfms.transportationcfms.service;

import com.cfms.kafka.ProductQuantity;
import com.cfms.transportationcfms.dto.TransportationDTO;
import com.cfms.transportationcfms.dto.TransportationEmissionDataDTO;
import com.cfms.transportationcfms.entity.Transportation;
import com.cfms.transportationcfms.entity.TransportationInventory;
import com.cfms.transportationcfms.entity.TransportationInventoryKey;
import com.cfms.transportationcfms.repository.TransportationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Service
public class TransportationService {

    private TransportationRepository transportationRepository;

    private WebClient.Builder webClientBuilder;

    private VehicleService vehicleService;

    private TransportationInventoryService transportationInventoryService;

    private KafkaTemplate<Long, ProductQuantity> kafkaTemplate;


    @Autowired
    public TransportationService(TransportationRepository transportationRepository, WebClient.Builder webClientBuilder, VehicleService vehicleService, TransportationInventoryService transportationInventoryService, KafkaTemplate<Long, ProductQuantity> kafkaTemplate) {
        this.transportationRepository = transportationRepository;
        this.webClientBuilder = webClientBuilder;
        this.vehicleService = vehicleService;
        this.transportationInventoryService = transportationInventoryService;
        this.kafkaTemplate = kafkaTemplate;
    }

    public void processTransportation(Long vehicleId, String transportInventory, String vendor, TransportationDTO transportationDTO) {

        // Building Transportation entity to save in database.
        Transportation transportation = Transportation.builder()
                .vehicle(vehicleService.getVehicle(vehicleId))
                .date(transportationDTO.getDate())
                .fuelType(transportationDTO.getFuelType())
                .fuelConsumption(transportationDTO.getFuelConsumption())
                .transportationType(transportationDTO.getTransportationType())
                .vendor(vendor)
                .build();

        // Building TransportationEmissionDataDTO Object
        TransportationEmissionDataDTO transportationEmissionDataDTO = TransportationEmissionDataDTO.builder()
                .vehicleModel(transportation.getVehicle().getModel().getModel())
                .engineSize(transportation.getVehicle().getEngineSize())
                .cylinders(transportation.getVehicle().getCylinders())
                .fuelConsumption(transportation.getFuelConsumption())
                .vehicleClass(transportation.getVehicle().getVehicleType())
                .fuelType(transportation.getFuelType())
                .build();

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
                .body(BodyInserters.fromValue(transportationEmissionDataDTO))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Integer>>() {})
                .map(response -> response.get("co2Emission"))
                .block();

        // Assigning the predicted CO2e Emission for the Transportation
        transportation.setCo2eEmission(predictedTransportationCo2Emission);

        // Saving Transportation
        transportation = transportationRepository.save(transportation);

        // Map the transportInventory with the related Quantities of their transport
        Map<String, Integer> transportInventoriesQuantityList = parseTransportInventoryString(transportInventory);

        // Finding the Total Quantity of Products Being involved in the Transportation.
        int totalQuantity = transportInventoriesQuantityList.values().stream()
                .mapToInt(Integer::intValue)
                .sum();

        // Distributing total Transportation emission between products and updating the TransportationInventory Table
        // Producing Kafka messages using "ProductQuantity.avsc" avro schema
        for(String productName : transportInventoriesQuantityList.keySet()) {

            // Creating TransportationInventoryKey (composite key) & Transient TransportationInventory Entity
            TransportationInventory transportationInventory = TransportationInventory.builder()
                    .transportationInventoryKey(TransportationInventoryKey.builder()
                            .transportation(transportation)
                            .productName(productName)
                            .build())
                    .productQuantity(transportInventoriesQuantityList.get(productName))
                    .co2eEmission((transportInventoriesQuantityList.get(productName).doubleValue()/totalQuantity)*predictedTransportationCo2Emission)
                    .build();

            // Saving TransportationInventory
            transportationInventoryService.saveTransportationInventory(transportationInventory);

            // Building the ProductQuantity Object to stream over Kafka.
            ProductQuantity productQuantity = ProductQuantity.newBuilder()
                    .setTransportationType(transportation.getTransportationType())
                    .setVendor(vendor)
                    .setProductName(productName)
                    .setQuantity(transportInventoriesQuantityList.get(productName))
                    .build();

            // Producing Kafka message.
            kafkaTemplate.send("transportInventoryQuantity", transportation.getTransportationId(), productQuantity);

        }

    }

    // Converting the String of transport_inventory to Map <String, Integer> <productName, Quantity>
    private Map<String, Integer> parseTransportInventoryString(String propertyIds) {
        Map<String, Integer> result = new HashMap<>();
        String[] pairs = propertyIds.split(",");
        for (String pair : pairs) {
            String[] keyValue = pair.split("=");
            if (keyValue.length == 2) {
                try {
                    String key = keyValue[0];
                    int quantity = Integer.parseInt(keyValue[1]);
                    result.put(key, quantity);
                } catch (NumberFormatException e) {
                    // Handle parsing error if needed
                }
            }
        }
        return result;
    }

}
