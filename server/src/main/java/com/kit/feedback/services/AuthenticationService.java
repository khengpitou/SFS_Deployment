package com.kit.feedback.services;

import com.kit.feedback.dto.AuthenticationRequest;
import com.kit.feedback.dto.AuthenticationResponse;
import com.kit.feedback.dto.RegisterRequest;
import com.kit.feedback.dto.ResetPasswordRequest;
import com.kit.feedback.model.*;
import com.kit.feedback.repository.LecturerRepository;
import com.kit.feedback.repository.ResetPasswordRepository;
import com.kit.feedback.repository.StudentRepository;
import com.kit.feedback.repository.UserRepository;
import com.kit.feedback.utils.Utility;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ResetPasswordRepository resetPasswordRepository;
    private final MailSenderService mailService;
    private final LecturerRepository lecturerRepository;
    private final StudentRepository studentRepository;

    public AuthenticationResponse register(RegisterRequest request){
        if(userRepository.existsByEmailOrUsername(request.getEmail(), request.getUsername())){
            throw new RequestRejectedException("Username or email is already used");
        }
        try{
            var user = User
                    .builder()
                    .username(request.getUsername())
                    .name(request.getFirstname() + " " + request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .build();
            var postUser = userRepository.save(user);
            //Save user to STUDENT, LECTURER table
            switch (request.getRole()){
                case STUDENT -> studentRepository.save(Student.builder()
                                .user(user)
                                .build());
                case LECTURER -> lecturerRepository.save(Lecturer.builder()
                                .user(user)
                                .build());
            }
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .lastname(request.getLastname())
                    .firstname(request.getFirstname())
                    .role(request.getRole())
                    .email(request.getEmail())
                    .username(request.getUsername())
                    .id(postUser.getId())
                    .build();
        } catch (Exception e){
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .lastname(user.getLastname())
                .firstname(user.getFirstname())
                .role(user.getRole())
                .email(user.getEmail())
                .username(user.getUsername())
                .id(user.getId())
                .build();
    }

    public String forgetPassword(String email){

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        String resetToken = Utility.generateToken();
        ResetPassword resetPassword = new ResetPassword();
        resetPassword.setToken(resetToken);
        resetPassword.setExpiryDate(LocalDateTime.now().plusHours(24)); //Expire 24 from now
        resetPassword.setUser(user);

        resetPasswordRepository.save(resetPassword);
        String mailBody = "Password Reset Token: " + resetToken;
        //Send link to reset email
        mailService.sendNewMail(email, "Password reset for Student Feedback System", mailBody);
        return "Password Reset Link has been sent to email";
    }

    public String resetPassword(ResetPasswordRequest request){
        ResetPassword resetPassword = resetPasswordRepository.findByToken(request.getToken()).orElseThrow();

        if (resetPassword.getExpiryDate().isBefore(LocalDateTime.now())){
            return "Token has expired";
        }
        User user = resetPassword.getUser();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        //Delete the used token from database
        resetPasswordRepository.deleteByToken(request.getToken());

        return "Password reset successfully";
    }
}
