package org.cfms.vendorservicecfms.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

@Data
public class VendorDTO {

    private Long id;

    @NotBlank(message = "VendorName is Mandatory")
    private String vendorName;

    @NotBlank(message = "Location is Mandatory")
    private String location;

    @NotNull(message = "Distance From Warehouse is Mandatory")
    @Positive(message = "Distance cannot be Negative")
    private Double distanceFromWarehouse;

    @Valid
    private List<VendorProductDTO> vendorProducts;

}
