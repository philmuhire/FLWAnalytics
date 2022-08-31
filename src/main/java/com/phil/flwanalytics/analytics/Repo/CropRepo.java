package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.Activity;
import com.phil.flwanalytics.analytics.model.Crop;
import com.phil.flwanalytics.analytics.projection.SingleCropByActivity;
import com.phil.flwanalytics.analytics.projection.SingleCropByYear;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CropRepo extends JpaRepository<Crop, Long> {
    Crop getByName(String name);

    @Query("SELECT  new com.phil.flwanalytics.analytics.projection.SingleCropByActivity(c.crop, c.activity, SUM(c.lossPercentage)) FROM CropActivity AS c WHERE c.crop.id=?1 GROUP BY c.activity ")
    List<SingleCropByActivity> summatePercentagePerActivityAndcrop(Long id);

    @Query("SELECT  new com.phil.flwanalytics.analytics.projection.SingleCropByYear(c.crop, c.year, SUM(c.lossPercentage)) FROM CropActivity AS c WHERE c.crop.id=?1 GROUP BY c.year ")
    List<SingleCropByYear> summatePercentagePerYearAndcrop(Long id);
}
