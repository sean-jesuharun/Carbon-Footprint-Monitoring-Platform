package org.cfms.co2eevaluationcfms.dto.vendor;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ProductionMatrixDTO {

    private Long id;
    private String region;
    private String animalSpecies;
    private String productionSystem;
    private String commodity;
}
