package org.cfms.vendorservicecfms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "production_matrix")
public class ProductionMatrix {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "productionMatrix_generator"
    )
    @GenericGenerator(
            name = "productionMatrix_generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "production_matrix_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "4"),
                    @org.hibernate.annotations.Parameter(name = "optimizer", value = "pooled-lo")
            }
    )
    private Long id;

    @Basic
    @Column(name = "region", nullable = false)
    private String region;

    @Basic
    @Column(name = "animal_species", nullable = false)
    private String animalSpecies;

    @Basic
    @Column(name = "production_system", nullable = false)
    private String productionSystem;

    @Basic
    @Column(name = "commodity", nullable = false)
    private String commodity;

}
