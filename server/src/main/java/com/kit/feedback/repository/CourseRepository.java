package com.kit.feedback.repository;

import com.kit.feedback.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    void deleteById(UUID id);

    Optional<Course> findByName(String name);

    Optional<Course> getCourseById(UUID id);
}
