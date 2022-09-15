package com.phil.flwanalytics.analytics.projection;

// import com.phil.flwanalytics.analytics.model.Food;

interface FoodSummary {

    CropName getCrop();

    Integer getYear();

    Double getLossPercentage();

    interface CropName {
        String getName();
    }
}
