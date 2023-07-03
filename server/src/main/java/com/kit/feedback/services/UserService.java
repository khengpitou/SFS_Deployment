package com.kit.feedback.services;

import com.kit.feedback.enums.Role;
import com.kit.feedback.model.User;
import com.kit.feedback.dto.UserResponse;
import com.kit.feedback.dto.UsersResponse;
import com.kit.feedback.repository.UserRepository;
import com.kit.feedback.utils.Utility;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public UsersResponse getUsers(int offset, int pageSize, Role role){
        //Todo: Implement sorts later
        PageRequest pageRequest = PageRequest.of(offset, pageSize);
        var getUserByPageRequest = userRepository.findAll(pageRequest).getContent().stream();
        var getAllUser = userRepository.findAll();
        List<User> response;
        switch (role){
            case ADMIN -> response = getUserByPageRequest.filter(item -> item.getRole().equals(Role.ADMIN)).collect(Collectors.toList());
            case LECTURER -> response = getUserByPageRequest.filter(item -> item.getRole().equals(Role.LECTURER)).collect(Collectors.toList());
            case STUDENT -> response = getUserByPageRequest.filter(item -> item.getRole().equals(Role.STUDENT)).collect(Collectors.toList());
            default -> response = userRepository.findAll(pageRequest).getContent();
        }
        int count;
        switch (role){
            case ADMIN -> count = getAllUser.stream().filter(item -> item.getRole().equals(Role.ADMIN)).toList().size();
            case LECTURER -> count = getAllUser.stream().filter(item -> item.getRole().equals(Role.LECTURER)).toList().size();
            case STUDENT -> count = getAllUser.stream().filter(item -> item.getRole().equals(Role.STUDENT)).toList().size();
            default -> count = (int) userRepository.count();
        }
        return UsersResponse.builder()
                .content(response)
                .count(count)
                .build();
    }

    public UserResponse get(UUID id) {
        try{
            var user = userRepository.findById(id).orElseThrow();
            return UserResponse.builder()
                    .role(user.getRole())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .id(user.getId())
                    .username(user.getUsername())
                    .authority(user.getAuthorities())
                    .email(user.getEmail())
                    .build();
        }catch (Exception e){
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public UserResponse edit(User request) {
        User foundUser = userRepository.findById(request.getId()).orElseThrow();
        foundUser.setPassword(request.getPassword().length() > 0 ? passwordEncoder.encode(request.getPassword()) : foundUser.getPassword());
        foundUser.setLastname(request.getLastname());
        foundUser.setFirstname(request.getFirstname());
        foundUser.setRole(request.getRole());
        foundUser.setName(request.getFirstname() + " " + request.getLastname());
        boolean isAdmin = Utility.checkIfAdmin();
        if (isAdmin) {
            var editedUser = userRepository.save(foundUser);
            return UserResponse.builder()
                    .role(editedUser.getRole())
                    .firstname(editedUser.getFirstname())
                    .lastname(editedUser.getLastname())
                    .id(editedUser.getId())
                    .username(editedUser.getUsername())
                    .authority(editedUser.getAuthorities())
                    .email(editedUser.getEmail())
                    .build();
        }else {
            log.error("Failed to edit user");
            throw new RuntimeException("Failed to edit user");
        }
    }

    public void delete(UUID id){
         userRepository.deleteById(id);
    }

}
