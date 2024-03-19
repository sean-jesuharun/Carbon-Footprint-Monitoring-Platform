package com.cfms.cfms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransportationDto {

    private Date date;

    private String fuel_type;

    private double fuel_consumption;

    private String transportation_type;

}
