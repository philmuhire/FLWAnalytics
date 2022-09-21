package com.phil.flwanalytics.authentication.api;

import com.phil.flwanalytics.authentication.domain.Role;
import com.phil.flwanalytics.authentication.domain.User;
import com.phil.flwanalytics.authentication.repo.RoleRepo;
import com.phil.flwanalytics.authentication.repo.UserRepo;
import com.phil.flwanalytics.authentication.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserResource {
    private final UserService userService;
    private final RoleRepo roleRepo;
    private final UserRepo userRepo;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body((userService.getUsers()));
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles() {
        return ResponseEntity.ok().body((roleRepo.findAll()));
    }

    @PostMapping("/user/save")
    @CrossOrigin(origins = "*")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PutMapping("/user/edit")
    @CrossOrigin(origins = "*")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/edit").toUriString());
        return ResponseEntity.created(uri).body(userRepo.save(user));
    }

    @GetMapping("/user/{id}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Optional<User>> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userRepo.findById(id));
    }

    // used URI bacause we want the response to have 201 response
    @PostMapping("/role/save")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}