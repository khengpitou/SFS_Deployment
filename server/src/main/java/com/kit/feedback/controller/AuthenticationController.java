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
    public ResponseEntity register(@RequestBody RegisterRequest request){
        try{
            return ResponseEntity.ok(authenticationService.register(request));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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
