package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.FoodProcess;
import com.phil.flwanalytics.analytics.projection.FoodProduce;
import com.phil.flwanalytics.analytics.projection.FoodSumData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface FoodProcessRepo extends JpaRepository<FoodProcess, Long> {
    @Query("SELECT  new com.phil.flwanalytics.analytics.projection.FoodSumData(c.food, c.year, SUM(c.lossPercentage))  FROM FoodProcess AS c GROUP BY c.food,c.year ")
    List<FoodSumData> summatePercentagePerYearAndcrop();

    @Query("select new com.phil.flwanalytics.analytics.projection.FoodProduce(f.id, f.food, f.country, f.produce, f.lossQuantity, f.year) from FoodProcess as f group by f.food, f.country, f.year")
    List<FoodProduce> getProduceOfAllYears();

    @Query("select new com.phil.flwanalytics.analytics.projection.FoodProduce(f.id, f.food, f.country, f.produce, f.lossQuantity, f.year) from FoodProcess as f where f.food.id=?1 group by f.food, f.country, f.year ")
    List<FoodProduce> getProducePerCropOfAllYears(Long id);

    List<FoodProcess> findAllByProcessId(Long id);

    void deleteAllByProcessId(Long id);

    // Page<FoodProcess> findAllByProcessId(Long id, PageRequest pageRequest);

    // @Query("select new
    // com.phil.flwanalytics.analytics.projection.FoodProduce(f.food, f.country,
    // f.produce, f.lossQuantity, f.year) from FoodProcess as f group by f.food,
    // f.country, f.year")
    // List<FoodProduce> getProduceOfSpecificYear(Integer year);
}
