package org.cfms.vendorservicecfms.dto;

import lombok.Data;

@Data
public class ProductionMatrixDTO {

    private Long id;
    private String region;
    private String animalSpecies;
    private String productionSystem;
    private String commodity;
}
