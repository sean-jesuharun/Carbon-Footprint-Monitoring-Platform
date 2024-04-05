package com.cfms.productioncfms.dto;


import lombok.Builder;

@Builder
public class ProductionEmissionDTO {
    
    private String region;
    
    private String animal_type;

    private String production_sys;

    private String commodity;


//    {
//        "region": ["Global"],
//        "animal_type": ["Chicken"],
//        "production_sys": ["Layers"],
//        "commodity": ["Eggs"]
//    }
    
}
