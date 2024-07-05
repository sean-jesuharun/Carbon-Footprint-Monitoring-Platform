package com.cfms.transportationcfms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class TransportationInventoryKey implements Serializable {

    @ManyToOne
    @JoinColumn(name = "transportation_id", nullable = false)
    private Transportation transportation;

    @Basic
    @Column(name = "product_name", nullable = false, columnDefinition = "varchar(50)")
    private String productName;

}
