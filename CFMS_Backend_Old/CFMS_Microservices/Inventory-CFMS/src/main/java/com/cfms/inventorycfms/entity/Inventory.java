package com.cfms.inventorycfms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    private String productName;

    @Basic
    @Column(name = "quantity_in_hand", nullable = false, columnDefinition = "int default 0")
    private int quantityInHand;

}
