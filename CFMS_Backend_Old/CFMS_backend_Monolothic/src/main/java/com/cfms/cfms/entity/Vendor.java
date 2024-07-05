package com.cfms.cfms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vendor")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vendor_id;

    @Basic
    @Column(name = "vendor_name", nullable = false, columnDefinition = "varchar(50)")
    private String vendor_name;

}
