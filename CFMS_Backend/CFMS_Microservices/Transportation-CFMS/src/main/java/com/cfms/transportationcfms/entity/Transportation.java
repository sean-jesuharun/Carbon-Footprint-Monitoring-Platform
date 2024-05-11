package com.cfms.transportationcfms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;

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
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "transportation_generator"
    )
    @GenericGenerator(
            name = "transportation_generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "transportation_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "4"),
                    @org.hibernate.annotations.Parameter(name = "optimizer", value = "pooled-lo")
            }
    )
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
    private Double fuelConsumption;

    @Basic
    @Column(name = "transportation_type", nullable = false, columnDefinition = "enum('INBOUND','OUTBOUND')")
    private String transportationType;

    @Basic
    @Column(name = "vendor", columnDefinition = "varchar(50)")
    private String vendor;

    @Basic
    @Column(name = "co2e_emission", nullable = false)
    private Double co2eEmission;

    @OneToMany(mappedBy = "transportation")
    List<TransportationInventory> transportationInventories;

}
