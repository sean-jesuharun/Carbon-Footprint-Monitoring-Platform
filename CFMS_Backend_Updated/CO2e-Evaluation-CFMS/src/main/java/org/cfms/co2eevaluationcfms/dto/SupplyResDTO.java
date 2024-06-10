package org.cfms.co2eevaluationcfms.dto;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class SupplyResDTO {

    private Long id;
    private Long vendorId;
    private OffsetDateTime date;
    private String productName;
    private Integer quantity;

}
