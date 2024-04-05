package com.cfms.cfms.service;

import com.cfms.cfms.entity.TransportationInventory;
import com.cfms.cfms.repository.TransportationInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransportationInventoryService {

    private TransportationInventoryRepository transportationInventoryRepository;

    @Autowired
    public TransportationInventoryService(TransportationInventoryRepository transportationInventoryRepository) {
        this.transportationInventoryRepository = transportationInventoryRepository;
    }

    public void saveTransportationInventory(TransportationInventory transportationInventory){
        transportationInventoryRepository.save(transportationInventory);
    }
}
