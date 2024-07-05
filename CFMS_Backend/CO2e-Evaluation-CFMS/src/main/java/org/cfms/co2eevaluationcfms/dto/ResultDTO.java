package org.cfms.co2eevaluationcfms.dto;

import lombok.Data;

@Data
public class ResultDTO {

    private Long id;
    private Long evaluationId;
    private Long vendorId;
    private String productName;
    private Integer quantity;
    private Double inboundCO2eEmissionKg;
    private Double outboundCO2eEmissionKg;
    private Double productionCO2eEmissionKg;
}
