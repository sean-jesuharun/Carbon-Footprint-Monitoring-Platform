package com.cfms.cfms.entity;

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

    @Basic
    @Column(name = "product_quantity", nullable = false)
    private int product_quantity;

}
