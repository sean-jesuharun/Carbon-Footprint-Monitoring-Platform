package org.cfms.customerservicecfms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CustomerDTO {

    private Long id;

    @NotBlank(message = "CustomerName is Mandatory")
    private String customerName;

    @NotBlank(message = "Location is Mandatory")
    private String location;

    @NotNull(message = "DistanceFromWarehouse is Mandatory")
    @Positive(message = "DistanceFromWarehouse cannot be Zero/Negative")
    private Double distanceFromWarehouse;

}
