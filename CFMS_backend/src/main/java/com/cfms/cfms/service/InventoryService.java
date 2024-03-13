package com.cfms.cfms.service;

import com.cfms.cfms.entity.Inventory;
import com.cfms.cfms.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private InventoryRepository inventoryRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Inventory getInventory(Long id){
        return inventoryRepository.getReferenceById(id);
    }

    public void addInventory(Long product_id, int quantity){
        Inventory inventory = inventoryRepository.getReferenceById(product_id);
        inventory.setQuantity_on_hand(inventory.getQuantity_on_hand() + quantity);
        inventoryRepository.save(inventory);
    }

    public void removeInventory(Long product_id, int quantity){
        Inventory inventory = inventoryRepository.getReferenceById(product_id);
        inventory.setQuantity_on_hand(inventory.getQuantity_on_hand() - quantity);
        inventoryRepository.save(inventory);
    }
}
