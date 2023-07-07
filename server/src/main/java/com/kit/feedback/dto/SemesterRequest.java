package com.kit.feedback.dto;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kit.feedback.model.Batch;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Data
public class SemesterRequest {
    private UUID id;
    private Integer semesterNumber;
    private Integer credit;
    private String startDate;
    private String endDate;
}
