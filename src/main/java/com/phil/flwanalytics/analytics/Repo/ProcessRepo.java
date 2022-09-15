package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.Process;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessRepo extends JpaRepository<Process, Long> {
    Process getByName(String name);
}
