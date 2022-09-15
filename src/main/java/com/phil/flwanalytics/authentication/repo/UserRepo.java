package com.phil.flwanalytics.authentication.repo;

import com.phil.flwanalytics.authentication.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
