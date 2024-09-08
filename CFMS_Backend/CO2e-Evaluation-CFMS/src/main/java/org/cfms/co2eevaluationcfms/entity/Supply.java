package org.cfms.co2eevaluationcfms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "supply")
@ToString
public class Supply {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "Supply_generator"
    )
    @GenericGenerator(
            name = "Supply_generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "supply_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "4"),
                    @org.hibernate.annotations.Parameter(name = "optimizer", value = "pooled-lo")
            }
    )
    private Long id;

    @Basic
    @Column(name = "vendor_id", nullable = false)
    private Long vendorId;

    @Basic
    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Basic
    @Column(name = "fuel_consumption_l", nullable = false)
    private Double fuelConsumptionL;

    @Basic
    @Column(name = "date", nullable = false)
    private OffsetDateTime date;

    @OneToMany(mappedBy = "supply")
    private List<SupplyItem> supplyItems;

}
