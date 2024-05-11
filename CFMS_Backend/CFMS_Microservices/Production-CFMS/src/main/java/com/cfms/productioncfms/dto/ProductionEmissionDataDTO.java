package com.cfms.productioncfms.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ProductionEmissionDataDTO {
    
//    private String region;
//
//    private String animal_type;
//
//    private String production_sys;
//
//    private String commodity;

    private List<String> region;

    private List<String> animal_type;

    private List<String> production_sys;

    private List<String> commodity;


//    // Sample Body in Postman
//    {
//        "region": ["Global"],
//        "animal_type": ["Chicken"],
//        "production_sys": ["Layers"],
//        "commodity": ["Eggs"]
//    }

    
}
