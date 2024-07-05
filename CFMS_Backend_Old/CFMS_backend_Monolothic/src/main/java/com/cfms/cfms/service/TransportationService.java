package com.cfms.cfms.service;

import com.cfms.cfms.dto.TransportationDTO;
import com.cfms.cfms.dto.TransportationEmissionDataDTO;
import com.cfms.cfms.entity.Transportation;
import com.cfms.cfms.entity.TransportationInventory;
import com.cfms.cfms.entity.TransportationInventoryKey;
import com.cfms.cfms.repository.TransportationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
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

    private VendorService vendorService;

    private TransportationInventoryService transportationInventoryService;

    private InventoryService inventoryService;


    @Autowired
    public TransportationService(TransportationRepository transportationRepository, WebClient.Builder webClientBuilder, VehicleService vehicleService, VendorService vendorService, TransportationInventoryService transportationInventoryService, InventoryService inventoryService) {
        this.transportationRepository = transportationRepository;
        this.webClientBuilder = webClientBuilder;
        this.vehicleService = vehicleService;
        this.vendorService = vendorService;
        this.transportationInventoryService = transportationInventoryService;
        this.inventoryService = inventoryService;
    }

    @Transactional
    public void processTransportation(Long vehicleId, String transportInventory, Long vendorId, TransportationDTO transportationDto) {

        // Building Transportation entity to save in database.
        Transportation transportation = Transportation.builder()
                .vehicle(vehicleService.getVehicle(vehicleId))
                .date(transportationDto.getDate())
                .fuel_type(transportationDto.getFuel_type())
                .fuel_consumption(transportationDto.getFuel_consumption())
                .transportation_type(transportationDto.getTransportation_type())
                .vendor((vendorId != null) ? vendorService.getVendor(vendorId).get() : null)
                .build();

        // Building TransportationEmissionDataDto Object
        TransportationEmissionDataDTO transportationEmissionDataDto = TransportationEmissionDataDTO.builder()
                .vehicleModel(transportation.getVehicle().getModel().getModel())
                .engineSize(transportation.getVehicle().getEngine_size())
                .cylinders(transportation.getVehicle().getCylinders())
                .fuelConsumption(transportation.getFuel_consumption())
                .vehicleClass(transportation.getVehicle().getVehicle_class())
                .fuelType(transportation.getFuel_type())
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
                .body(BodyInserters.fromValue(transportationEmissionDataDto))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Integer>>() {})
                .map(response -> response.get("co2Emission"))
                .block();

        // Saving Transportation
        transportation = transportationRepository.save(transportation);

        // Map the transportInventory with the related Quantities of their transport
        Map<Long, Integer> transportInventoriesQuantityList = parseTransportInventoryString(transportInventory);

        for(Long productId : transportInventoriesQuantityList.keySet()) {

            // Creating TransportationInventoryKey (composite key) & Transient TransportationInventory Entity
            TransportationInventory transportationInventory = TransportationInventory.builder()
                    .transportationInventoryKey(TransportationInventoryKey.builder()
                            .transportation(transportation)
                            .inventory(inventoryService.getInventory(productId))
                            .build())
                    .product_quantity(transportInventoriesQuantityList.get(productId))
                    .build();

            // Saving TransportationInventory
            transportationInventoryService.saveTransportationInventory(transportationInventory);

            // Updating Inventory
            if (transportation.getTransportation_type().equals("INBOUND")) {
                inventoryService.addInventory(productId, transportInventoriesQuantityList.get(productId));
            } else {
                inventoryService.removeInventory(productId, transportInventoriesQuantityList.get(productId));
            }

        }

    }

    // Converting the String of transport_inventory to Map <Long, Integer> <inventory_id, Quantity>
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
