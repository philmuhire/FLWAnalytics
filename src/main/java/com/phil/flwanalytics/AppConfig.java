package com.phil.flwanalytics;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    CommandLineRunner initDatabase(){
        return args -> {
            System.out.println("Sample data initialized");
        };
    }
}
