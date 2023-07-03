package com.kit.feedback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordRequest {

    //For verifying token and persist new password
    private String token;
    String password;

    //For sending token to email
    private String email;

}
