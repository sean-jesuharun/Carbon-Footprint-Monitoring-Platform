package com.cfms.transportationcfms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "transportation_inventory")
public class TransportationInventory {

    @EmbeddedId
    private TransportationInventoryKey transportationInventoryKey;

    @ManyToOne
    @JoinColumn(name = "transportation_id", nullable = false, insertable = false, updatable = false)
    private Transportation transportation;

    @Basic
    @Column(name = "product_quantity", nullable = false)
    private Integer productQuantity;

    @Basic
    @Column(name = "co2e_emission", nullable = false)
    private Double co2eEmission;

}
