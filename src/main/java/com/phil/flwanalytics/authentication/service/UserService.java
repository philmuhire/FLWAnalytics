package com.phil.flwanalytics.authentication.service;

import com.phil.flwanalytics.authentication.domain.Role;
import com.phil.flwanalytics.authentication.domain.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    List<User> getUsers();
}
