package org.cfms.vehicleservicecfms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class VehicleDTO {

    private Long id;

    @NotBlank(message = "Model is Mandatory")
    private String model;

    @NotNull(message = "EngineSize is Mandatory")
    @Positive(message = "EngineSize cannot be Zero/Negative")
    private Double engineSize;

    @NotNull(message = "CylinderNumber is Mandatory")
    @Positive(message = "Cylinders cannot be Zero/Negative")
    private Integer cylinders;

    @NotBlank(message = "FuelType is Mandatory")
    private String fuelType;

    @NotBlank(message = "VehicleType is Mandatory")
    private String vehicleType;

    @NotBlank(message = "Transmission is Mandatory")
    private String transmission;

}
