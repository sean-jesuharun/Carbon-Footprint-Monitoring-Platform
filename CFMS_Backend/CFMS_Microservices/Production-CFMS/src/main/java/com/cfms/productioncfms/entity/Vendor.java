package com.cfms.productioncfms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vendor")
public class Vendor {

    @Id
    @Column(name = "vendor_name", nullable = false, columnDefinition = "varchar(50)")
    private String vendorName;

    @Basic
    @Column(name = "location", nullable = false, columnDefinition = "varchar(50)")
    private String location;

}
