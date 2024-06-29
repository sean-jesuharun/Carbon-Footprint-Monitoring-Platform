package org.cfms.co2eevaluationcfms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "evaluation")
@ToString
public class Evaluation {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "evaluation_generator"
    )
    @GenericGenerator(
            name = "evaluation_generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "evaluation_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "4"),
                    @org.hibernate.annotations.Parameter(name = "optimizer", value = "pooled-lo")
            }
    )
    private Long id;

    @Basic
    @Column(name = "job_name", nullable = false)
    private String jobName;

    @Basic
    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Basic
    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @OneToMany(mappedBy = "evaluation", cascade = CascadeType.REMOVE)
    private List<Result> results;

}
