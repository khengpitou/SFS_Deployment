package com.kit.feedback.dto;

import com.kit.feedback.model.Department;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DepartmentsResponse {
    private long count;
    private List<DepartmentResponse> content;
}
