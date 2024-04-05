package com.cfms.productioncfms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "production_matrix")
public class ProductionMatrix {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productionMatrixId;

    @Basic
    @Column(name = "region", nullable = false, columnDefinition = "varchar(50)")
    private String region;

    @Basic
    @Column(name = "animal_species", nullable = false, columnDefinition = "varchar(50)")
    private String animalSpecies;

    @Basic
    @Column(name = "production_system", nullable = false, columnDefinition = "varchar(50)")
    private String productionSystem;

    @Basic
    @Column(name = "commodity", nullable = false, columnDefinition = "varchar(50)")
    private String commodity;

}
