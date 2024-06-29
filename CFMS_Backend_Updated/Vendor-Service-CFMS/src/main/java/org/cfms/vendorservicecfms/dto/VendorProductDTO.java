package org.cfms.vendorservicecfms.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VendorProductDTO {

    @NotBlank(message = "ProductName is Mandatory")
    private String productName;

    @Valid
    @NotNull(message = "Product must have ProductionMatrix")
    private ProductionMatrixDTO productionMatrix;

}
