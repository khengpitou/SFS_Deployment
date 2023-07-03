package com.kit.feedback.dto;

import com.kit.feedback.model.Batch;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentResponse {
    private UUID id;
    private String name;
    private String createdAt;
    private List<BatchResponse> batches;

    private UUID createdBy;
    private UUID updatedBy;
    private String updatedAt;
}
