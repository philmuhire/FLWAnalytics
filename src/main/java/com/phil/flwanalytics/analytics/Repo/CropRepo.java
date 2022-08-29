package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.Activity;
import com.phil.flwanalytics.analytics.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropRepo extends JpaRepository<Crop, Long> {
}
