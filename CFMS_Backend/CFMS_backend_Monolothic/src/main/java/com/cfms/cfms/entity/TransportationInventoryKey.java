package com.cfms.cfms.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Inventory inventory;

}
