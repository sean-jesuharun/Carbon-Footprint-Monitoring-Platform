package com.cfms.inventorycfms.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InventoryDTO {

    private String transportationType;

    private List<TransportInventoryQuantityDTO> transportInventoryList;

}
