package org.cfms.co2eevaluationcfms.dto;

import lombok.Data;

@Data
public class DeliveryItemDTO {

    private Long vendorId;
    private String productName;
    private Integer quantity;

}
