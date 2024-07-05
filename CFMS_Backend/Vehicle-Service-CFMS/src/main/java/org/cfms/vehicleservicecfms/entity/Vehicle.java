package org.cfms.vehicleservicecfms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vehicle")
@ToString
public class Vehicle {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "vehicle_generator"
    )
    @GenericGenerator(
            name = "vehicle_generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "vehicle_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "4"),
                    @org.hibernate.annotations.Parameter(name = "optimizer", value = "pooled-lo")
            }
    )
    private Long id;

    @Basic
    @Column(name = "model", nullable = false, columnDefinition = "varchar(50)")
    private String model;

    @Basic
    @Column(name = "engine_size", nullable = false)
    private Double engineSize;

    @Basic
    @Column(name = "cylinders", nullable = false)
    private Integer cylinders;

    @Basic
    @Column(name = "fuel_type", nullable = false, columnDefinition = "varchar(50)")
    private String fuelType;

    @Basic
    @Column(name = "vehicle_type", nullable = false, columnDefinition = "varchar(50)")
    private String vehicleType;

    @Basic
    @Column(name = "transmission", nullable = false, columnDefinition = "varchar(50)")
    private String transmission;

}
