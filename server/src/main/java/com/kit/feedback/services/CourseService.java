package com.kit.feedback.services;

import com.kit.feedback.dto.CoursesResonse;
import com.kit.feedback.model.Course;
import com.kit.feedback.model.User;
import com.kit.feedback.repository.CourseRepository;
import com.kit.feedback.repository.SemesterRepository;
import com.kit.feedback.utils.Utility;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Transactional
@RequiredArgsConstructor
@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final SemesterRepository semesterRepository;

    public CoursesResonse getCourses(Integer page, Integer size){
        PageRequest pageRequest = PageRequest.of(page, size);
        var courses = courseRepository.findAll(pageRequest);
        return CoursesResonse.builder()
                .content(courses.getContent())
                .count(courseRepository.count())
                .build();
    }

    public Course create(Course request){
        var user = (User)Utility.getCurrentAuthentication().getPrincipal();
        //Check if already exist
        var course = courseRepository.findByName(request.getName());
        if(course.isPresent()){
            throw new RuntimeException("Course already exist: " + request.getName());
        }
        //Check if Semester exists
        var semester = semesterRepository.getSemesterById(request.getId())
                .orElseThrow(() -> new RuntimeException("Semester Id doesn't exist: " + request.getId().toString()));
        request.setSemester(semester);
        request.setCreatedBy(user.getId());
        request.setCreatedAt(LocalDateTime.now().toString());
        request.setUpdatedAt(LocalDateTime.now().toString());
        request.setUpdatedBy(user.getId());
        if(Utility.checkIfAdmin()){
            var saved = courseRepository.save(request);
            return saved;
        } else{
            throw new RuntimeException("Failed to create, Reason: Not Admin");
        }
    }

    public Course get(UUID id){
        var course = courseRepository.getCourseById(id).orElseThrow(() -> new RuntimeException("Cannot find course with ID: " + id.toString()));
        return course;
    }

    public Course edit(Course request){
        var user = (User)Utility.getCurrentAuthentication().getPrincipal();
        var course = courseRepository.getCourseById(request.getId())
                .orElseThrow(() -> new RuntimeException("Course doesn't exist: ID:" + request.getId()));
        course.setName(request.getName());
        course.setCredit(request.getCredit());
        course.setUpdatedBy(user.getId());
        course.setUpdatedAt(LocalDateTime.now().toString());
        if(Utility.checkIfAdmin()){
            var saved = courseRepository.save(course);
            return saved;
        }else{
            throw new RuntimeException("Failed to edit, Reason: Not Admin");
        }
    }

    public String delete(UUID id){
        try{
            if(Utility.checkIfAdmin()){
                courseRepository.deleteById(id);
                return "Successfully delete course ID: " + id;
            }else{
                return "Failed to delete, Reason: Not Admin";
            }
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
