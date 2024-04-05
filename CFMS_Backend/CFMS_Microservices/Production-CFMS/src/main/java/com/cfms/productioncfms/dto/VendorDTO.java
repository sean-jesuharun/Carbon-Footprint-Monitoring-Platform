package com.cfms.productioncfms.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VendorDTO {

    private String vendorName;

    private String location;

    private List<ProductionMatrixDTO> productList;

}
