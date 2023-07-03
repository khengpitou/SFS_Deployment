package com.kit.feedback.dto;

import com.kit.feedback.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private Role role;

    private UUID id;
    private Collection<? extends GrantedAuthority> authority;
}