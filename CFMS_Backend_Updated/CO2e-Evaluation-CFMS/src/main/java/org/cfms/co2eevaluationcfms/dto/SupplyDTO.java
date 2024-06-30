package org.cfms.co2eevaluationcfms.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

@Data
public class SupplyDTO {

    private Long id;

    @NotNull(message = "VendorId is Mandatory")
    private Long vendorId;

    @NotNull(message = "VehicleId is Mandatory")
    private Long vehicleId;

    @NotNull(message = "FuelConsumption is Mandatory")
    @Positive(message = "FuelConsumption cannot be Zero/Negative")
    private Double fuelConsumption;

    @Valid
    @NotEmpty(message = "Supply must have Product")
    private List<SupplyItemDTO> supplyItems;

}
