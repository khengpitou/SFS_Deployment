package com.kit.feedback.repository;

import com.kit.feedback.model.ResetPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResetPasswordRepository extends JpaRepository<ResetPassword, Integer> {
    Optional<ResetPassword> findByToken(String token);

    void deleteByToken(String token);
}
