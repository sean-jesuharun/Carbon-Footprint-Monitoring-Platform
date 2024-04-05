package com.cfms.cfms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "model_make")
public class ModelMake {

    @Id
    private String model;

    @Basic
    @Column(name = "make", nullable = false, columnDefinition = "varchar(50)")
    private String make;

}
