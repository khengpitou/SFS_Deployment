package com.kit.feedback.controller;


import com.kit.feedback.dto.UserResponse;
import com.kit.feedback.dto.UsersResponse;
import com.kit.feedback.enums.Role;
import com.kit.feedback.model.*;
import com.kit.feedback.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(value = "/get-all-user")
    public ResponseEntity<UsersResponse> getUsers(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "role", defaultValue = "STUDENT") Role role
            ){
        var users = userService.getUsers(page, size, role);
        return ResponseEntity.ok(users);
    }

    @GetMapping(value = "/get-user")
    public ResponseEntity<UserResponse> getUser(@RequestParam(name = "id") UUID id){
        return ResponseEntity.ok(userService.get(id));
    }

    @PostMapping(value = "/edit-user")
    public ResponseEntity<UserResponse> editUser(@RequestBody User request){
        return ResponseEntity.ok(userService.edit(request));
    }

    @GetMapping(value = "/delete-user")
    public ResponseEntity<String> deleteUser(@RequestParam(name = "id") UUID id){
        userService.delete(id);
        return ResponseEntity.ok("Successfully deleted user");
    }
}
