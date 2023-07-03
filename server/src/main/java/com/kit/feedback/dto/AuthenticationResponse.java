package com.kit.feedback.dto;

import com.kit.feedback.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private UUID id;
    private String token;
    private String username;
    private String email;
    private Role role;
    private String firstname;
    private String lastname;
}
