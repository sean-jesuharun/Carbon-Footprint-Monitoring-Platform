package com.cfms.cfms.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransportationEmissionDataDto {

    private String vehicleModel;

    private double engineSize;

    private int cylinders;

    private double fuelConsumption;

    private String vehicleClass;

    private String fuelType;

}
