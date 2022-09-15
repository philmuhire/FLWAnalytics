package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageRepo extends JpaRepository<Stage, Long> {
    Stage getByName(String name);

}
