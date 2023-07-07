package com.kit.feedback.dto;

import com.kit.feedback.model.Semester;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SemestersResponse {
    private List<Semester> content;
    private long count;
}
