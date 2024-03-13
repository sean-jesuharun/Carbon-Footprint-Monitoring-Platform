package com.cfms.cfms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transportation_inventory")
public class TransportationInventory {

    @EmbeddedId
    private TransportationInventoryKey transportationInventoryKey;

    @Basic
    @Column(name = "product_quantity", nullable = false)
    private int product_quantity;

}
