package com.kit.feedback.controller;

import com.kit.feedback.model.Department;
import com.kit.feedback.services.AuthenticationService;
import com.kit.feedback.services.DepartmentService;
import com.kit.feedback.services.MailSenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/demo")
@RequiredArgsConstructor
public class HomeController {

    @Autowired
    private MailSenderService javaMailSender;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private AuthenticationService authService;
    @RequestMapping(value = {"/home"}, method = RequestMethod.POST)
    public ResponseEntity<String> displayHome(@RequestBody Department request) {
        return ResponseEntity.ok("Home at secured endpoint");
    }

}
