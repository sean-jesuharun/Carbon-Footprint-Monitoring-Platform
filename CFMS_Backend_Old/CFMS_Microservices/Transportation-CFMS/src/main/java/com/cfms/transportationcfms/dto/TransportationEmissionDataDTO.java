package com.cfms.transportationcfms.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransportationEmissionDataDTO {

    private String vehicleModel;

    private double engineSize;

    private int cylinders;

    private double fuelConsumption;

    //Category
    private String vehicleClass;

    private String fuelType;

}
