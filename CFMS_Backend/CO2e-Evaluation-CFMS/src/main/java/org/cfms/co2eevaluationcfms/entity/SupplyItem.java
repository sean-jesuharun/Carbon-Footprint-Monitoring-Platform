package org.cfms.co2eevaluationcfms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "supply_item")
@ToString
public class SupplyItem {

    @EmbeddedId
    private SupplyItemKey supplyItemKey;

    @ManyToOne
    @JoinColumn(name = "supply_id", nullable = false, insertable = false, updatable = false)
    private Supply supply;

    @Basic
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Basic
    @Column(name = "inbound_co2e_kg", nullable = false)
    private Double inboundCO2eEmissionKg;


}
