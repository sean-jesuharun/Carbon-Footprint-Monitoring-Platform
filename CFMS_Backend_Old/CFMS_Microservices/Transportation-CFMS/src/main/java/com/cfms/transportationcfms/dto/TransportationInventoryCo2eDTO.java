package com.cfms.transportationcfms.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransportationInventoryCo2eDTO {

    private String productName;

    private double totalCo2eEmission;

    private Long totalQuantity;
}
