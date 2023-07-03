package com.kit.feedback.services;

import com.kit.feedback.dto.BatchRequest;
import com.kit.feedback.dto.BatchResponse;
import com.kit.feedback.dto.BatchesResponse;
import com.kit.feedback.dto.UserResponse;
import com.kit.feedback.model.*;
import com.kit.feedback.repository.BatchRepository;
import com.kit.feedback.repository.DepartmentRepository;
import com.kit.feedback.utils.Utility;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BatchService {
    private final BatchRepository batchRepository;
    private final DepartmentRepository departmentRepository;

    public BatchesResponse getBatches(int page, int size){
        try{
            PageRequest pageRequest = PageRequest.of(page, size);
            var batches = batchRepository.findAll(pageRequest);
            return BatchesResponse.builder()
                    .content(batches.getContent())
                    .count(batchRepository.count())
                    .build();
        }catch (Exception e){
            throw new RuntimeException("Failed to get all batches");
        }

    }

    public BatchResponse create(BatchRequest request){
        try{
            if(batchRepository.findBatchByBatchNumber(request.getBatchNumber()).isPresent()){
                throw new RuntimeException("Batch number already exist");
            }
            User user = (User) Utility.getCurrentAuthentication().getPrincipal();
            Department department = departmentRepository.findById(request.getDepartmentId()).orElseThrow();
            var batch = Batch.builder()
                    .batchNumber(request.getBatchNumber())
                    .department(department)
                    .build();
            batch.setCreatedAt(LocalDateTime.now().toString());
            batch.setUpdatedAt(LocalDateTime.now().toString());
            batch.setUpdatedBy(user.getId());
            batch.setCreatedBy(user.getId());
            var createdBatch = batchRepository.save(batch);
            return BatchResponse.builder()
                    .id(createdBatch.getId())
                    .createdAt(createdBatch.getCreatedAt())
                    .createdBy(createdBatch.getCreatedBy())
                    .updatedAt(createdBatch.getUpdatedAt())
                    .updatedBy(createdBatch.getUpdatedBy())
                    .batchNumber(createdBatch.getBatchNumber())
                    .build();
        } catch(Exception e){
            log.error("Error creating new batch: " + e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public BatchResponse get(UUID id){
        var response = batchRepository.getBatchById(id).orElseThrow();
        return BatchResponse.builder()
                .batchNumber(response.getBatchNumber())
                .id(response.getId())
                .createdAt(response.getCreatedAt())
                .createdBy(response.getCreatedBy())
                .updatedAt(response.getUpdatedAt())
                .updatedBy(response.getUpdatedBy())
                .build();
    }

    public BatchResponse edit(BatchRequest request){
        User user = (User) Utility.getCurrentAuthentication().getPrincipal();

        //Check if batch with same batch number already exist
        var alreadyExist = batchRepository.findBatchByBatchNumber(request.getBatchNumber());
        if(alreadyExist.isPresent()){
            throw new RuntimeException("Batch Number already exist");
        }

        var batch = batchRepository.findById(request.getId()).orElseThrow();
        batch.setUpdatedAt(LocalDateTime.now().toString());
        batch.setBatchNumber(request.getBatchNumber());
        batch.setUpdatedBy(user.getId());
        if(Utility.checkIfAdmin()){
            var saved = batchRepository.save(batch);
            return BatchResponse.builder()
                    .createdAt(saved.getCreatedAt())
                    .createdBy(saved.getCreatedBy())
                    .updatedBy(saved.getUpdatedBy())
                    .updatedAt(saved.getUpdatedAt())
                    .batchNumber(saved.getBatchNumber())
                    .id(saved.getId())
                    .build();
        } else{
            throw new RuntimeException("Failed to edit batch-id: " + request.getId());
        }
    }

    public String delete(UUID id){
        try{
            batchRepository.deleteById(id);
            return "Successfully deleted";
        }catch (Exception e){
            return "Failed to delete batch: " + id;
        }
    }
}
