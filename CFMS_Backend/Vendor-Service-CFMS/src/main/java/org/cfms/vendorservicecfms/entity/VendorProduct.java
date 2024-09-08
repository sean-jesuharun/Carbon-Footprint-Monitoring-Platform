package org.cfms.vendorservicecfms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vendor_product")
@ToString
public class VendorProduct {

    @EmbeddedId
    private VendorProductKey vendorProductKey;

    @ManyToOne
    @JoinColumn(name = "vendor_id", insertable = false, updatable = false)
    private Vendor vendor;

    @ManyToOne
    @JoinColumn(name = "production_matrix_id", nullable = false)
    private ProductionMatrix productionMatrix;

}
