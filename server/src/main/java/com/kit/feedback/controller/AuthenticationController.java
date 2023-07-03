package com.kit.feedback.controller;

import com.kit.feedback.dto.AuthenticationRequest;
import com.kit.feedback.dto.AuthenticationResponse;
import com.kit.feedback.dto.RegisterRequest;
import com.kit.feedback.dto.ResetPasswordRequest;
import com.kit.feedback.repository.UserRepository;
import com.kit.feedback.services.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/auth")
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, UserRepository userRepository){
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
//        Avoid Register if use the same email or username
        if(userRepository.existsByEmailOrUsername(request.getEmail(), request.getUsername())){
            log.error("Username or email is already used: " + request.getUsername() + ", " + request.getEmail());
            throw new RequestRejectedException("Username or email is already used");
        }
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestBody ResetPasswordRequest request){
        return ResponseEntity.ok(authenticationService.forgetPassword(request.getEmail()));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request){
        System.out.println(request);
        return ResponseEntity.ok(authenticationService.resetPassword(request));
    }
}
