package org.cfms.vehicleservicecfms.dto;

import lombok.Data;

@Data
public class VehicleDTO {

    private Long id;
    private String model;
    private Double engineSize;
    private Integer cylinders;
    private String fuelType;
    private String vehicleType;
    private String transmission;

}
