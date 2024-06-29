package org.cfms.co2eevaluationcfms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vendor_supply")
@ToString
public class VendorSupply {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "vendorSupply_generator"
    )
    @GenericGenerator(
            name = "vendorSupply_generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "vendor_supply_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "4"),
                    @org.hibernate.annotations.Parameter(name = "optimizer", value = "pooled-lo")
            }
    )
    private Long id;

    @Basic
    @Column(name = "vendor_id", nullable = false)
    private Long vendorId;

    @Basic
    @Column(name = "product_name", nullable = false)
    private String productName;

    @Basic
    @Column(name = "date", nullable = false)
    private OffsetDateTime date;

    @Basic
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Basic
    @Column(name = "inbound_co2e_kg", nullable = false)
    private Double inboundCO2eEmissionKg;

}
