package com.kit.feedback.services;

import com.kit.feedback.dto.*;
import com.kit.feedback.model.Batch;
import com.kit.feedback.model.Department;
import com.kit.feedback.model.User;
import com.kit.feedback.repository.DepartmentRepository;
import com.kit.feedback.utils.Utility;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentsResponse getDepartments(int offset, int size){
        //ToDo: Implement sorts later
        PageRequest pageRequest = PageRequest.of(offset, size);
        var deparmentsByPageRequest = departmentRepository.findAll(pageRequest);
        //Init Empty List of DepartmentResponse
        List<DepartmentResponse> response = new ArrayList<>();
        deparmentsByPageRequest.getContent().forEach(item -> {
            //Init batches to omit user infos
            List<BatchResponse> batches = new ArrayList<>();
            item.getBatches().forEach(batch -> {
                batches.add(BatchResponse.builder()
                                .id(batch.getId())
                                .batchNumber(batch.getBatchNumber())
                                .createdBy(batch.getCreatedBy())
                                .updatedBy(batch.getUpdatedBy())
                                .updatedAt(batch.getUpdatedAt())
                                .createdAt(batch.getCreatedAt())
                                .build());
            });
            response.add(DepartmentResponse.builder()
                            .createdAt(item.getCreatedAt())
                            .createdBy(item.getCreatedBy())
                            .updatedAt(item.getUpdatedAt())
                            .updatedBy(item.getUpdatedBy())
                            .name(item.getName())
                            .batches(batches)
                            .id(item.getId())
                            .build());
        });
        return DepartmentsResponse.builder()
                .content(response)
                .count(departmentRepository.count())
                .build();
    }

    public DepartmentResponse create(Department request){
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        //Check if department with same name already exist
        var alreadyExist = departmentRepository.findDepartmentByName(request.getName());
        if(alreadyExist.isPresent()){
            throw new RuntimeException("Department already exist");
        }

        Department department;
        department = Department.builder()
                    .name(request.getName())
                    .build();
        department.setCreatedAt(LocalDateTime.now().toString());
        department.setUpdatedAt(LocalDateTime.now().toString());
        department.setCreatedBy(user.getId());
        department.setUpdatedBy(user.getId());
        if(Utility.checkIfAdmin()){
            var saved = departmentRepository.save(department);
            return DepartmentResponse.builder()
                    .id(saved.getId())
                    .name(saved.getName())
                    .createdAt(saved.getCreatedAt())
                    .createdBy(saved.getCreatedBy())
                    .updatedBy(saved.getUpdatedBy())
                    .updatedAt(saved.getUpdatedAt())
                    .build();
        }
        log.error("Failed to create new Department, possible reasons: Current role not allowed to create");
        throw new RuntimeException("Failed to create new department");
    }

    public DepartmentResponse edit(Department request){
        var currentUser = (User) Utility.getCurrentAuthentication().getPrincipal();
        var department = departmentRepository.findById(request.getId()).orElseThrow();

        //Check if department with same name already exist
        var alreadyExist = departmentRepository.findDepartmentByName(request.getName());
        if(alreadyExist.isPresent()){
            throw new RuntimeException("Department already exist");
        }

        department.setName(request.getName());
        department.setUpdatedBy(currentUser.getId());
        department.setUpdatedAt(LocalDateTime.now().toString());
        if(Utility.checkIfAdmin()){
            var saved = departmentRepository.save(department);
            return DepartmentResponse.builder()
                    .createdAt(saved.getCreatedAt())
                    .createdBy(saved.getCreatedBy())
                    .updatedAt(saved.getUpdatedAt())
                    .updatedBy(saved.getUpdatedBy())
                    .id(saved.getId())
                    .name(saved.getName())
                    .build();
        }
        log.error("Failed to edit this department, id: " + department.getId());
        throw new RuntimeException("Failed to edit this department, id: " + department.getId());
    }

    public DepartmentResponse get(UUID id){
        var department = departmentRepository.findById(id).orElseThrow();

        //Init batches to omit user info
        List<BatchResponse> batches = new ArrayList<>();
        department.getBatches().forEach(batch -> {
            batches.add(BatchResponse.builder()
                    .id(batch.getId())
                    .batchNumber(batch.getBatchNumber())
                    .updatedAt(batch.getUpdatedAt())
                    .updatedBy(batch.getUpdatedBy())
                    .createdAt(batch.getCreatedAt())
                    .createdBy(batch.getCreatedBy())
                    .build());
        });
        return DepartmentResponse.builder()
                .name(department.getName())
                .createdAt(department.getCreatedAt())
                .createdBy(department.getCreatedBy())
                .updatedAt(department.getUpdatedAt())
                .updatedBy(department.getUpdatedBy())
                .id(department.getId())
                .batches(batches)
                .build();
    }

    public String delete(UUID id){
        departmentRepository.deleteById(id);
        return "Successfully delete Department";
    }
}
