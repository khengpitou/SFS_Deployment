package com.kit.feedback.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Batch extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "department_id")
    private Department department;
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer batchNumber;

    //ToDo: Integrate Semester into batch
    @OneToMany(mappedBy = "batch", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Semester> semesters;
}







