package com.kit.feedback.repository;


import com.kit.feedback.model.Department;
import com.kit.feedback.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DepartmentRepository extends JpaRepository<Department, UUID> {
    Optional<Department> findById(UUID id);

    Optional<Department> findDepartmentByName(String name);
}
