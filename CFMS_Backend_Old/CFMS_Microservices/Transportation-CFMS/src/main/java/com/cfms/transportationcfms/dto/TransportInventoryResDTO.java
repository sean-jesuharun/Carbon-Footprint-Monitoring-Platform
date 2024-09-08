package com.cfms.transportationcfms.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TransportInventoryResDTO {

    private String productName;

    private String vendorName;

    private Integer transportedQuantity;

    private Double co2eEmission;

}
