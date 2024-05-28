package org.cfms.vendorservicecfms.dto;

import lombok.Data;

import java.util.List;

@Data
public class VendorDTO {

    private Long id;
    private String vendorName;
    private String location;
    private Double distanceFromWarehouse;
    private List<VendorProductDTO> vendorProducts;

}
