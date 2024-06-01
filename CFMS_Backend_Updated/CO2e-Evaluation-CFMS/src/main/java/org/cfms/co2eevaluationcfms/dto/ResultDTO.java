package org.cfms.co2eevaluationcfms.dto;

import lombok.Data;

@Data
public class ResultDTO {

    private Long id;
    private Long evaluationId;
    private Long vendorId;
    private String productName;
    private Integer quantity;
    private Double inboundCo2e;
    private Double outboundCo2e;
    private Double productionCo2e;
}
