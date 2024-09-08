package org.cfms.co2eevaluationcfms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class SupplyItemDTO {

    @NotBlank(message = "ProductName is Mandatory")
    private String productName;

    @NotNull(message = "Quantity is Mandatory")
    @Positive(message = "Quantity cannot be Zero/Negative")
    private Integer quantity;
}
