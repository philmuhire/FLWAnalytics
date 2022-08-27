package com.phil.flwanalytics.authentication.repo;

import com.phil.flwanalytics.authentication.domain.Role;
import com.phil.userservice.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Long> {
    public Role findByName(String name);
}