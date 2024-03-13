package com.cfms.cfms.service;

import com.cfms.cfms.entity.Transportation;
import com.cfms.cfms.repository.TransportationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransportationService {

    private TransportationRepository transportationRepository;

    @Autowired
    public TransportationService(TransportationRepository transportationRepository) {
        this.transportationRepository = transportationRepository;
    }

    public Transportation saveTransportation(Transportation transportation){
        return transportationRepository.save(transportation);
    }
}
