package com.cfms.inventorycfms.service;

import com.cfms.inventorycfms.entity.Inventory;
import com.cfms.inventorycfms.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private InventoryRepository inventoryRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    // Adding New Inventory
    public void addNewInventory(String productName){

        // If the Inventory is Not available, then Adding it to the Inventory Table.
        if (inventoryRepository.findById(productName).isEmpty()){

            // Building the Inventory Transient Entity.
            Inventory inventory = Inventory.builder()
                    .productName(productName)
                    .build();

            // Save New Inventory.
            saveInventory(inventory);

        }
    }

    // Update quantity in hand of Inventories based on INBOUND and OUTBOUND transportation.
    public void updateInventoryQuantity(String transportationType, String productName, int quantity){

        // Retrieve inventory.
        Inventory inventory = getInventory(productName);

        // If INBOUND transportation then need to Add quantities.
        if (transportationType.equals("INBOUND")){

            // Add quantity.
            inventory.setQuantityInHand(inventory.getQuantityInHand() + quantity);

        } else {

            // Subtract quantity
            inventory.setQuantityInHand(inventory.getQuantityInHand() - quantity);

        }

        // Update Inventory.
        saveInventory(inventory);

    }

    // Save Inventory.
    public void saveInventory(Inventory inventory) {

        inventoryRepository.save(inventory);

    }

    // Retrieve Inventory.
    public Inventory getInventory(String productName){
        return inventoryRepository.findById(productName).get();
    }

}
