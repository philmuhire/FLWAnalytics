package com.phil.flwanalytics.analytics.projection;

import com.phil.flwanalytics.analytics.model.Crop;

interface CropSummary {

    CropName getCrop();
    Integer getYear();
    Double getLossPercentage();
    interface CropName {
        String getName();
    }
}
