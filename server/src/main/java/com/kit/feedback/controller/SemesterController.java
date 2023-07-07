package com.kit.feedback.controller;

import com.kit.feedback.dto.SemesterRequest;
import com.kit.feedback.services.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/semester")
public class SemesterController {
    private final SemesterService semesterService;
    @Autowired
    public SemesterController(SemesterService semesterService){
        this.semesterService = semesterService;
    }
    @GetMapping("/get-all")
    public ResponseEntity getSemesters(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size){
        try{
            return ResponseEntity.ok(semesterService.getSemesters(page, size));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(semesterService.getSemesters(page,size));
        }
    }
    @GetMapping("/get")
    public ResponseEntity getSemester(@RequestParam(name = "id")UUID id){
        try {
            return ResponseEntity.ok(semesterService.get(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/create")
    public ResponseEntity createSemester(@RequestBody SemesterRequest request){
        try{
            return ResponseEntity.ok(semesterService.create(request));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/edit")
    public ResponseEntity editSemester(@RequestBody SemesterRequest request){
        try{
            return ResponseEntity.ok(semesterService.edit(request));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/delete")
    public ResponseEntity deleteSemester(@RequestParam UUID id){
        try{
            return ResponseEntity.ok(semesterService.delete(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
