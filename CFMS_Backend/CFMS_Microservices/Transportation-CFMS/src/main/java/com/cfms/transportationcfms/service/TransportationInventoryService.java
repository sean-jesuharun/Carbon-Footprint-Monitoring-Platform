package com.cfms.transportationcfms.service;


import com.cfms.kafka.ProductQuantity;
import com.cfms.transportationcfms.entity.Transportation;
import com.cfms.transportationcfms.entity.TransportationInventory;
import com.cfms.transportationcfms.entity.TransportationInventoryKey;
import com.cfms.transportationcfms.repository.TransportationInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TransportationInventoryService {

    private TransportationInventoryRepository transportationInventoryRepository;

    private TransportationKafkaProducerService transportationKafkaProducerService;

    @Autowired
    public TransportationInventoryService(TransportationInventoryRepository transportationInventoryRepository, TransportationKafkaProducerService transportationKafkaProducerService) {
        this.transportationInventoryRepository = transportationInventoryRepository;
        this.transportationKafkaProducerService = transportationKafkaProducerService;
    }

    // Update Transportation Inventory.
    public void addTransportationInventory(String transportInventory, Transportation transportation){

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
                    .co2eEmission((transportInventoriesQuantityList.get(productName).doubleValue()/totalQuantity)*transportation.getCo2eEmission())
                    .build();

            // Saving TransportationInventory
            saveTransportationInventory(transportationInventory);

            // Produce TransportedProduct Data
            transportationKafkaProducerService.produceTransportedProductData(transportation.getTransportationId(), transportation.getTransportationType(), transportation.getVendor(), productName, transportInventoriesQuantityList.get(productName));

        }

    }

    // Saving Transportation
    public void saveTransportationInventory(TransportationInventory transportationInventory){
        transportationInventoryRepository.save(transportationInventory);
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
