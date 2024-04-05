package com.cfms.transportationcfms.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TransportationDTO {

    private Date date;

    private String fuelType;

    private double fuelConsumption;

    private String transportationType;

}
