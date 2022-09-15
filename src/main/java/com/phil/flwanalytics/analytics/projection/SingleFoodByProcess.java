package com.phil.flwanalytics.analytics.projection;

import com.phil.flwanalytics.analytics.model.Process;
import com.phil.flwanalytics.analytics.model.Food;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SingleFoodByProcess {
    Food food;
    Process process;
    Double sum;

}
