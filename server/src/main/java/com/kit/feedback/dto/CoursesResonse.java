package com.kit.feedback.dto;

import com.kit.feedback.model.Course;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class CoursesResonse {
    private List<Course> content;
    private long count;
}
