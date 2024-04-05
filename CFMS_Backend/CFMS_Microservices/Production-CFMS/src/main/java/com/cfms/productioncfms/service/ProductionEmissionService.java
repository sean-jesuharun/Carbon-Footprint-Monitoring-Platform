package com.cfms.productioncfms.service;

import com.cfms.productioncfms.dto.ProductionEmissionDTO;
import org.springframework.stereotype.Service;

@Service
public class ProductionEmissionService {

    // Prediction Production Emission.
    public double predictProductionEmission(String region, String animalType, String productionSystem, String commodity){

        // Building the ProductionEmissionDTO.
        ProductionEmissionDTO productionEmissionDTO = ProductionEmissionDTO.builder()
                .region(region)
                .animal_type(animalType)
                .production_sys(productionSystem)
                .commodity(commodity)
                .build();

        // Code for sending and retrieving prediction details.

        return 0.0;
    }

}
