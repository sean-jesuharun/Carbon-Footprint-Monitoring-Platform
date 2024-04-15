package com.cfms.productioncfms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductionInventoryCo2eDTO {

    private String productName;

    private double totalCo2eEmission;

    private Long totalQuantity;

}
