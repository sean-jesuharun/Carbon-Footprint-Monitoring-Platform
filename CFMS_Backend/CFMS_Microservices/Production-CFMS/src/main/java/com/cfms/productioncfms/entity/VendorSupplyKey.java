package com.cfms.productioncfms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class VendorSupplyKey implements Serializable {

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @Basic
    @Column(name = "product_name", nullable = false, columnDefinition = "varchar(50)")
    private String productName;

}
