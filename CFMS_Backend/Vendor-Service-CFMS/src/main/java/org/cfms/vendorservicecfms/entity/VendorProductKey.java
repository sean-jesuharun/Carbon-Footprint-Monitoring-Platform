package org.cfms.vendorservicecfms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class VendorProductKey {

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @Basic
    @Column(name = "product_name", nullable = false)
    private String productName;

}
