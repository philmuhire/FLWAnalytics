package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.FoodProcess;
import com.phil.flwanalytics.analytics.projection.FoodSumData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodProcessRepo extends JpaRepository<FoodProcess, Long> {
    @Query("SELECT  new com.phil.flwanalytics.analytics.projection.FoodSumData(c.food, c.year, SUM(c.lossPercentage))  FROM FoodProcess AS c GROUP BY c.food,c.year ")
    List<FoodSumData> summatePercentagePerYearAndcrop();
//    List<FoodProcess> findAllByActivityNotNull(PageRequest pageable);
}

//interface CropSummary {
//
//    CropName getFood();
//    Integer getYear();
//    Double getLossPercentage();
//    interface CropName {
//        String getName();
//    }
//}


