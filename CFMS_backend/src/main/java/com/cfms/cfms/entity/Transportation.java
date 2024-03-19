package com.cfms.cfms.entity;

import jakarta.persistence.*;
import lombok.*;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transportation_id;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @Basic
    @Column(name = "date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;

    @Basic
    @Column(name = "fuel_type", nullable = false, columnDefinition = "varchar(50)")
    private String fuel_type;

    @Basic
    @Column(name = "fuel_consumption", nullable = false)
    private double fuel_consumption;

    @Basic
    @Column(name = "transportation_type", nullable = false, columnDefinition = "enum('INBOUND','OUTBOUND')")
    private String transportation_type;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;


}
