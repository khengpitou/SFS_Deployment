package com.kit.feedback.utils;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.UUID;

public class Utility {

    public static String generateToken(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

    public static Authentication getCurrentAuthentication(){
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static boolean checkIfAdmin(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var authorities = (List<? extends GrantedAuthority>) authentication.getAuthorities();
        var authority = authorities.get(0);
        if(authority.toString().equals("ADMIN")){
            return true;
        }else return false;
    }

    public static String getCurrentUrl(){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = requestAttributes.getRequest();

        String currentUrl = request.getRequestURL().toString();
        return currentUrl;
    }

    public static String getBaseUrl(){
        UriComponentsBuilder builder = ServletUriComponentsBuilder.fromCurrentContextPath();
        String baseUrl = builder.build().toUriString();
        return baseUrl;

    }
}
