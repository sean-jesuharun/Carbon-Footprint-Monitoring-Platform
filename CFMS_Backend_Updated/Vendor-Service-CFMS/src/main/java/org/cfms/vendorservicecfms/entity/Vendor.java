package org.cfms.vendorservicecfms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vendor")
public class Vendor {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "vendor_generator"
    )
    @GenericGenerator(
            name = "vendor_generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "vendor_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "4"),
                    @org.hibernate.annotations.Parameter(name = "optimizer", value = "pooled-lo")
            }
    )
    private Long id;

    @Column(name = "vendor_name", nullable = false, unique = true)
    private String vendorName;

    @Basic
    @Column(name = "location", nullable = false)
    private String location;

    @Basic
    @Column(name = "distance_from_warehouse", nullable = false)
    private Double distanceFromWarehouse;

    @OneToMany(mappedBy = "vendor")
    private List<VendorProduct> vendorProducts;

}
