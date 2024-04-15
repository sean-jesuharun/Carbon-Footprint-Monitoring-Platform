package com.cfms.transportationcfms.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TransportationDTO {

    private Date date;

    private Long vehicleId;

    private String fuelType;

    private double fuelConsumption;

    private String transportationType;

    private String vendor;

    private List<TransportInventoryQuantityDTO> transportInventoryList;

}
