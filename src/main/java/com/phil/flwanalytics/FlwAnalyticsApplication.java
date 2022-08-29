package com.phil.flwanalytics;

import com.phil.flwanalytics.analytics.Repo.CountryRepo;
import com.phil.flwanalytics.analytics.model.Country;
import com.phil.flwanalytics.authentication.domain.Role;
import com.phil.flwanalytics.authentication.domain.User;
import com.phil.flwanalytics.authentication.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
@RequiredArgsConstructor @Slf4j
public class FlwAnalyticsApplication {

    private final CountryRepo countryRepo;
    public static void main(String[] args) {
        SpringApplication.run(FlwAnalyticsApplication.class, args);
    }


    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    CommandLineRunner run(UserService userService) {
        return args -> {
            if(userService.getUsers().isEmpty()){

                userService.saveRole(new Role(null, "ROLE_SYS_ADMIN"));
                userService.saveRole(new Role(null, "ROLE_CTR_ADMIN"));
                userService.saveRole(new Role(null, "ROLE_CTR_USER"));

                Country country = new Country("Uganda", "Sub sahara");
                countryRepo.save(country);

                userService.saveUser(new User(null, "John Travolta", "john", "1234", new ArrayList<>(), country ));
                userService.saveUser(new User(null, "Will Smith", "will", "1234", new ArrayList<>(), country));
                userService.saveUser(new User(null, "Jim Carry", "jim", "1234", new ArrayList<>(), country));
                userService.saveUser(new User(null, "Arnold Schwarzenegger", "arnold", "1234", new ArrayList<>(), country));

                userService.addRoleToUser("john", "ROLE_CTR_USER");
                userService.addRoleToUser("will", "ROLE_CTR_ADMIN");
                userService.addRoleToUser("jim", "ROLE_SYS_ADMIN");
                userService.addRoleToUser("arnold", "ROLE_SYS_ADMIN");
                userService.addRoleToUser("arnold", "ROLE_SYS_ADMIN");
                userService.addRoleToUser("arnold", "ROLE_CTR_USER");
            } else{
                log.info("Sample data has already been initialized");
            }
        };
    }

}