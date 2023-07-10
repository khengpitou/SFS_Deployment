package com.kit.feedback.dto;

import com.kit.feedback.model.Batch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BatchRequest extends Batch {

    private UUID departmentId;
}
