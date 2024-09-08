package com.cfms.cfms.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;

@Embeddable
public class VendorSupplyProductKey implements Serializable {

    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Inventory inventory;

}
