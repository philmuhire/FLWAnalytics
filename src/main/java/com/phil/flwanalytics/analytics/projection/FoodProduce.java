package com.phil.flwanalytics.analytics.projection;

import com.phil.flwanalytics.analytics.model.Country;
import com.phil.flwanalytics.analytics.model.Food;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FoodProduce {
    Long id;
    Food food;
    Country country;
    Double produce;
    Double lossQuantity;
    Integer year;

}
