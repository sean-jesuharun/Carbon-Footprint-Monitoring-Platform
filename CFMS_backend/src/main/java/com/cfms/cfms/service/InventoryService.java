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
}
