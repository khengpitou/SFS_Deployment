package com.kit.feedback.repository;

import com.kit.feedback.model.Batch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BatchRepository extends JpaRepository<Batch, UUID> {
    Optional<Batch> getBatchById(UUID id);

    Optional<Batch> findBatchByBatchNumber(int number);

    void deleteById(UUID id);
}
