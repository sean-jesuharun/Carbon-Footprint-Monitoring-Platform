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
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;

    @Basic
    @Column(name = "product_name", nullable = false, columnDefinition = "varchar(50)")
    private String product_name;

    @Basic
    @Column(name = "quantity_on_hand", nullable = false)
    private int quantity_on_hand;


}
