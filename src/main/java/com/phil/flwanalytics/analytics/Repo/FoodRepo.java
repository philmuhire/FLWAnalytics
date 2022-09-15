package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.Food;
import com.phil.flwanalytics.analytics.projection.SingleFoodByProcess;
import com.phil.flwanalytics.analytics.projection.SingleFoodByYear;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepo extends JpaRepository<Food, Long> {
    Food getByName(String name);

    Food findFirstByOrderByNameDesc();

    @Query("SELECT  new com.phil.flwanalytics.analytics.projection.SingleFoodByProcess(c.food, c.process, SUM(c.lossPercentage)) FROM FoodProcess AS c WHERE c.food.id=?1 GROUP BY c.process ")
    List<SingleFoodByProcess> summatePercentagePerProcessAndFood(Long id);

    @Query("SELECT  new com.phil.flwanalytics.analytics.projection.SingleFoodByYear(c.food, c.year, SUM(c.lossPercentage)) FROM FoodProcess AS c WHERE c.food.id=?1 GROUP BY c.year ")
    List<SingleFoodByYear> summatePercentagePerYearAndFood(Long id);

}
