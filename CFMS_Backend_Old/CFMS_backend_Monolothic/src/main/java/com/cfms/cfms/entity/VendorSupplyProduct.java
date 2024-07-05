package com.cfms.cfms.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vendor_supply_product")
public class VendorSupplyProduct {

    @EmbeddedId
    private VendorSupplyProductKey vendorSupplyProductKey;

}
