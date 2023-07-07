package com.kit.feedback.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Semester extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne
    @JoinColumn(name="batch_id")
    @JsonBackReference
    private Batch batch;
    private Integer semesterNumber;
    private Integer credit;
    private LocalDate startDate;
    private LocalDate endDate;

    //Courses
    @OneToMany(mappedBy = "semester", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Course> courses;
}
