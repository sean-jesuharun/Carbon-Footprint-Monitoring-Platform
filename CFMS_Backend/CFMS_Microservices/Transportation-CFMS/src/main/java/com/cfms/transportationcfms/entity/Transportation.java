package com.cfms.transportationcfms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "transportation")
public class Transportation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transportationId;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @Basic
    @Column(name = "date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic
    @Column(name = "fuel_type", nullable = false, columnDefinition = "varchar(50)")
    private String fuelType;

    @Basic
    @Column(name = "fuel_consumption", nullable = false)
    private double fuelConsumption;

    @Basic
    @Column(name = "transportation_type", nullable = false, columnDefinition = "enum('INBOUND','OUTBOUND')")
    private String transportationType;

    @Basic
    @Column(name = "vendor", columnDefinition = "varchar(50)")
    private String vendor;

    @Basic
    @Column(name = "co2e_emission", nullable = false)
    private double co2eEmission;

}
