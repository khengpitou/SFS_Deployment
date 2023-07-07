package com.kit.feedback.controller;

import com.kit.feedback.model.Course;
import com.kit.feedback.services.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/create")
    public ResponseEntity createCourse(@RequestBody Course request){
        try{
            return ResponseEntity.ok(courseService.create(request));
        }catch(Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
    }
    @PostMapping("/edit")
    public ResponseEntity editCourse(@RequestBody Course request){
        try{
            return ResponseEntity.ok(courseService.edit(request));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/get")
    public ResponseEntity getCourse(@RequestParam UUID id){
        try{
            return ResponseEntity.ok(courseService.get(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/delete")
    public ResponseEntity deleteCourse(@RequestParam UUID id){
        try{
            return ResponseEntity.ok(courseService.delete(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/get-all")
    public ResponseEntity deleteCourse(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size){
        try{
            return ResponseEntity.ok(courseService.getCourses(page, size));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
