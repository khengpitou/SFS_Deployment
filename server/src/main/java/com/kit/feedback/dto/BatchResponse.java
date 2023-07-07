package com.kit.feedback.dto;

import com.kit.feedback.model.BaseEntity;
import com.kit.feedback.model.Semester;
import com.kit.feedback.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BatchResponse {
    private UUID id;
    private Integer batchNumber;
    private String createdAt;
    private UUID createdBy;
    private String updatedAt;
    private UUID updatedBy;
    private List<Semester> semesters;
}
