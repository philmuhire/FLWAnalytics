package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.CropActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropActivityRepo extends JpaRepository<CropActivity, Long> {
}
