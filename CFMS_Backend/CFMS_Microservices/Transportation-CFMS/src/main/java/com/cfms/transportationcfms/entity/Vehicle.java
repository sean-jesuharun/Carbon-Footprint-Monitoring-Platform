package com.cfms.transportationcfms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;

    @ManyToOne
    @JoinColumn(name = "model", nullable = false)
    private ModelMake model;

    @Basic
    @Column(name = "engine_size", nullable = false)
    private Double engineSize;

    @Basic
    @Column(name = "cylinders", nullable = false)
    private Integer cylinders;

    @Basic
    @Column(name = "vehicle_type", nullable = false, columnDefinition = "varchar(50)")
    private String vehicleType;

    @Basic
    @Column(name = "transmission", nullable = false, columnDefinition = "varchar(50)")
    private String transmission;


}
