package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepo extends JpaRepository<Activity, Long> {
}
