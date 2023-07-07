package com.kit.feedback.services;

import com.kit.feedback.dto.SemesterRequest;
import com.kit.feedback.dto.SemestersResponse;
import com.kit.feedback.model.Semester;
import com.kit.feedback.model.User;
import com.kit.feedback.repository.BatchRepository;
import com.kit.feedback.repository.SemesterRepository;
import com.kit.feedback.utils.Utility;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SemesterService {
    private final SemesterRepository semesterRepository;
    private final BatchRepository batchRepository;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyy");

    public Semester create(SemesterRequest request){
        //Check if already exist
        var exist = semesterRepository.findBySemesterNumber(request.getSemesterNumber());
        if(exist.isPresent()){
            throw new RuntimeException("Semester number already exist");
        }
        var batch = batchRepository.getBatchById(request.getId()).orElseThrow(
                () -> new RuntimeException("Batch not found with ID: " + request.getId())
            );
        var user = (User) Utility.getCurrentAuthentication().getPrincipal();
        //Format for date string from Request
        var startDate = LocalDate.parse(request.getStartDate(), formatter);
        var endDate = LocalDate.parse(request.getEndDate(), formatter);
        var semester = Semester.builder()
                .semesterNumber(request.getSemesterNumber())
                .batch(batch)
                .credit(request.getCredit())
                .endDate(endDate)
                .startDate(startDate)
                .build();
        semester.setUpdatedAt(LocalDateTime.now().toString());
        semester.setCreatedAt(LocalDateTime.now().toString());
        semester.setCreatedBy(user.getId());
        semester.setUpdatedBy(user.getId());
        var saved = semesterRepository.save(semester);
        if(Utility.checkIfAdmin()){
            var built = Semester.builder()
                    .startDate(startDate)
                    .endDate(endDate)
                    .credit(saved.getCredit())
                    .semesterNumber(saved.getSemesterNumber())
                    .id(saved.getId())
                    .build();
            built.setCreatedAt(saved.getCreatedAt());
            built.setCreatedBy(saved.getCreatedBy());
            built.setUpdatedBy(saved.getUpdatedBy());
            built.setUpdatedAt(saved.getUpdatedAt());
            return built;
        }else{
            throw new RuntimeException("Failed to create, Reason: Not Admin");
        }
    }

    public SemestersResponse getSemesters(Integer page, Integer size){
        PageRequest pageRequest = PageRequest.of(page, size);
        var semesters = semesterRepository.findAll(pageRequest).getContent();
        return SemestersResponse.builder()
                .count(semesterRepository.count())
                .content(semesters)
                .build();
    }

    public Semester get(UUID id){
        var semester = semesterRepository.getSemesterById(id).orElseThrow(() -> new RuntimeException("Semester Id doesn't exist: " + id.toString()));
        return semester;
    }

    public Semester edit(SemesterRequest request){
        var user = (User) Utility.getCurrentAuthentication().getPrincipal();
        var foundSemester = semesterRepository.getSemesterById(request.getId()).orElseThrow(
                () -> new RuntimeException("Semester Id doesn't exist:" + request.getId().toString())
        );
        var endDate = LocalDate.parse(request.getEndDate(), formatter);
        var startDate = LocalDate.parse(request.getStartDate(), formatter);
        foundSemester.setSemesterNumber(request.getSemesterNumber());
        foundSemester.setCredit(request.getCredit());
        foundSemester.setEndDate(endDate);
        foundSemester.setStartDate(startDate);
        foundSemester.setUpdatedAt(LocalDateTime.now().toString());
        foundSemester.setUpdatedBy(user.getId());
        if(Utility.checkIfAdmin()){
            var saved = semesterRepository.save(foundSemester);
            return saved;
        }else{
            throw new RuntimeException("Failed to edit, Reason: Not Admin");
        }
    }

    public String delete(UUID id){
        try{
            if(Utility.checkIfAdmin()){
                semesterRepository.deleteById(id);
                return "Successfully delete Semester with ID: " + id.toString();
            } else{
                throw new RuntimeException("Failed to delete, Reason: Not Admin");
            }
        }catch(Exception e){
            return e.getMessage();
        }
    }
}
