package com.phil.flwanalytics.analytics.projection;

import com.phil.flwanalytics.analytics.model.Food;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FoodSumData {
    Food food;
    Integer year;
    Double sum;


}
