package com.cfms.productioncfms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vendor_supply")
@DynamicInsert // exclude null property values in the Hibernate’s SQL INSERT statement.
@DynamicUpdate
@ToString
public class VendorSupply {

    @EmbeddedId
    private VendorSupplyKey vendorSupplyKey;

    @ManyToOne
    @JoinColumn(name = "vendor_id", insertable = false, updatable = false)
    private Vendor vendor;

    @ManyToOne
    @JoinColumn(name = "production_matrix_id", nullable = false)
    private ProductionMatrix productionMatrix;

    @Basic
    @Column(name = "supplied_quantity", columnDefinition = "int default 0")
    private Integer suppliedQuantity;

    @Basic
    @Column(name = "co2e_emission", columnDefinition = "double default 0.0")
    private Double co2eEmission;

}
