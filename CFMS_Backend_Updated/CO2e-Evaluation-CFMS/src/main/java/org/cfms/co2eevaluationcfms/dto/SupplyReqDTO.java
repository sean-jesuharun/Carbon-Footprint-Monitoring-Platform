package org.cfms.co2eevaluationcfms.dto;

import lombok.Data;

import java.util.List;

@Data
public class SupplyReqDTO {

    private Long vendorId;
    private Long vehicleId;
    private Double fuelConsumption;
    private List<SupplyItemDTO> supplyItems;

}
