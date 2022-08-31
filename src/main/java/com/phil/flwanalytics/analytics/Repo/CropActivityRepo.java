package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.CropActivity;
import com.phil.flwanalytics.analytics.projection.CropSumData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropActivityRepo extends JpaRepository<CropActivity, Long> {
    @Query("SELECT  new com.phil.flwanalytics.analytics.projection.CropSumData(c.crop, c.year, SUM(c.lossPercentage))  FROM CropActivity AS c GROUP BY c.crop,c.year ")
    List<CropSumData> summatePercentagePerYearAndcrop();
}

//interface CropSummary {
//
//    CropName getCrop();
//    Integer getYear();
//    Double getLossPercentage();
//    interface CropName {
//        String getName();
//    }
//}


