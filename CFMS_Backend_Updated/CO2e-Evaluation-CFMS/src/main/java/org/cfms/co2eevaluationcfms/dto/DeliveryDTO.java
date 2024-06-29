package org.cfms.co2eevaluationcfms.dto;

import lombok.Data;

import java.util.List;

@Data
public class DeliveryDTO {

    private String jobName;
    private Long customerId;
    private Long vehicleId;
    private Double fuelConsumption;
    private List<DeliveryItemDTO> deliveryItems;

}
