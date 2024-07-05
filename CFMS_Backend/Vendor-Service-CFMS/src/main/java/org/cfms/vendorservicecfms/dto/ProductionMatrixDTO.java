package org.cfms.vendorservicecfms.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductionMatrixDTO {

    private Long id;

    @NotBlank(message = "Region is Mandatory")
    private String region;

    @NotBlank(message = "AnimalSpecies is Mandatory")
    private String animalSpecies;

    @NotBlank(message = "ProductionSystem is Mandatory")
    private String productionSystem;

    @NotBlank(message = "Commodity is Mandatory")
    private String commodity;
}
