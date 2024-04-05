package com.cfms.productioncfms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vendor_supply")
@ToString
public class VendorSupply {

    @EmbeddedId
    private VendorSupplyKey vendorSupplyKey;

    @ManyToOne
    @JoinColumn(name = "production_matrix_id", nullable = false)
    private ProductionMatrix productionMatrix;

    @Basic
    @Column(name = "supplied_quantity", nullable = false, columnDefinition = "int default 0")
    private int suppliedQuantity;

    @Basic
    @Column(name = "co2e_emission", nullable = false, columnDefinition = "double default 0.0")
    private double co2eEmission;

}
