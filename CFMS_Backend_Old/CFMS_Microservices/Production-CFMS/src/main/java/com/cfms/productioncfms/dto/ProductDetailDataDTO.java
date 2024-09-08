package com.cfms.productioncfms.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ProductDetailDataDTO {

    private String productName;

    private String region;

    private String animalSpecies;

    private String productionSystem;

    private String commodity;

}
