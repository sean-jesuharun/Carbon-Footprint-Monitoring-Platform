package org.cfms.co2eevaluationcfms.dto;

import lombok.Data;
import lombok.ToString;

import java.time.OffsetDateTime;

@Data
@ToString
public class SupplyDetailDTO {

    private Long supplyId;
    private Long vendorId;
    private Long vehicleId;
    private OffsetDateTime date;
    private String productName;
    private Integer quantity;
    private Double inboundCO2eEmissionKg;

}
