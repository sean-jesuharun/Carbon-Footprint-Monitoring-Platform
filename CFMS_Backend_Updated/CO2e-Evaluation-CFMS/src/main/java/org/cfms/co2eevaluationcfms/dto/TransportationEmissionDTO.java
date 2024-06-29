package org.cfms.co2eevaluationcfms.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransportationEmissionDTO {

    private String vehicleModel;

    private double engineSize;

    private int cylinders;

    private double fuelConsumption;

    private String vehicleClass;

    private String fuelType;

}
