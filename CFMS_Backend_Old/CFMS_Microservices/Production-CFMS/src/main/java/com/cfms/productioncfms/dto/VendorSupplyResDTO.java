package com.cfms.productioncfms.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class VendorSupplyResDTO {

    private String productName;

    private String vendorName;

    private Integer suppliedQuantity;

    private Double co2eEmission;

}
