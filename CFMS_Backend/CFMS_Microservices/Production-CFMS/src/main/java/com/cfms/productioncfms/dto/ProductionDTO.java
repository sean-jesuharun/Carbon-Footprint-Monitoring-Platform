package com.cfms.productioncfms.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductionDTO {

    private String transportationType;

    private String vendor;

    private List<TransportInventoryQuantityDTO> transportInventoryList;

}
