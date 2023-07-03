package com.kit.feedback.dto;

import com.kit.feedback.model.Batch;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BatchesResponse {
    private List<Batch> content;
    private long count;
}
