package com.kit.feedback.repository;

import com.kit.feedback.model.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, UUID> {
    Optional<Semester> getSemesterById(UUID id);

    void deleteById(UUID id);

    Optional<Semester> findBySemesterNumber(Integer num);
}