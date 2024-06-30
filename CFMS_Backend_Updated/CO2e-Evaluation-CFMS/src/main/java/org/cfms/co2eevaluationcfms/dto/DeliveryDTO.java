package org.cfms.co2eevaluationcfms.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class DeliveryDTO {

    @NotBlank(message = "JobName is Mandatory")
    private String jobName;

    @NotNull(message = "CustomerId is Mandatory")
    private Long customerId;

    @NotNull(message = "VehicleId is Mandatory")
    private Long vehicleId;

    @NotNull(message = "FuelConsumption is Mandatory")
    @Positive(message = "FuelConsumption cannot be Zero/Negative")
    private Double fuelConsumption;

    @Valid
    @NotEmpty(message = "Delivery must have Product")
    private List<DeliveryItemDTO> deliveryItems;

}
