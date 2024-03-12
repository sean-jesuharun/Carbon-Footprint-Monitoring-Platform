package com.cfms.cfms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransportationEmissionData {

    private String vehicleModel;

    private double engineSize;

    private int cylinders;

    private double fuelConsumption;

    private String vehicleClass;

    private String fuelType;

}
