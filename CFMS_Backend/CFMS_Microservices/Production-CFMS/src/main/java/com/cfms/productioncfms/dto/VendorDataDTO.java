package com.cfms.productioncfms.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class VendorDataDTO {

    private String vendorName;

    private String location;

    private List<ProductDetailDataDTO> supplyProductDetailList;

}
