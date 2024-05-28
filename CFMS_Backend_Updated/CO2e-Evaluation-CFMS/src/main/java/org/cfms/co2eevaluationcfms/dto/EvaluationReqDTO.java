package org.cfms.co2eevaluationcfms.dto;

import lombok.Data;

import java.util.List;


@Data
public class EvaluationReqDTO {

    private String jobName;
    private Long customerId;
    private Long vehicleId;
    private Double totalFuelConsumption;

    private List<DeliveryDTO> deliveries;

}
