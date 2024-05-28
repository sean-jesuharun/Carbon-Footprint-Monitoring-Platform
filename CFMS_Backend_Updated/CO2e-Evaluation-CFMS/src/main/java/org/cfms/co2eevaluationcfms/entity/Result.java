package org.cfms.co2eevaluationcfms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "result")
@ToString
public class Result {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "result_generator"
    )
    @GenericGenerator(
            name = "result_generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "result_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "10"),
                    @org.hibernate.annotations.Parameter(name = "optimizer", value = "pooled-lo")
            }
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "evaluation_id", nullable = false)
    private Evaluation evaluation;

    @Basic
    @Column(name = "vendor_id", nullable = false)
    private Long vendorId;

    @Basic
    @Column(name = "product_name", nullable = false)
    private String productName;

    @Basic
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Basic
    @Column(name = "inbound_co2e", nullable = false)
    private Double inboundCo2e;

    @Basic
    @Column(name = "outbound_co2e", nullable = false)
    private Double outboundCo2e;

    @Basic
    @Column(name = "production_co2e", nullable = false)
    private Double productionCo2e;


}
