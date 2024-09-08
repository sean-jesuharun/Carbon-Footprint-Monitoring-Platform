package com.cfms.cfms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicle_id;

    @ManyToOne
    @JoinColumn(name = "model", nullable = false)
    private ModelMake model;

    @Basic
    @Column(name = "engine_size", nullable = false)
    private double engine_size;

    @Basic
    @Column(name = "cylinders", nullable = false)
    private int cylinders;

    @Basic
    @Column(name = "vehicle_class", nullable = false, columnDefinition = "varchar(50)")
    private String vehicle_class;

    @Basic
    @Column(name = "transmission", nullable = false, columnDefinition = "varchar(50)")
    private String transmission;


}
