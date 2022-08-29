package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.ActionLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActionLogRepo extends JpaRepository<ActionLog, Long> {
}
