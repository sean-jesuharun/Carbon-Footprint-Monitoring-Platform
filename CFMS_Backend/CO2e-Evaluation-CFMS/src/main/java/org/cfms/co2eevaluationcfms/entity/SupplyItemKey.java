package org.cfms.co2eevaluationcfms.entity;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class SupplyItemKey {

    @ManyToOne
    @JoinColumn(name = "supply_id", nullable = false)
    private Supply supply;

    @Basic
    @Column(name = "product_name", nullable = false)
    private String productName;

}
