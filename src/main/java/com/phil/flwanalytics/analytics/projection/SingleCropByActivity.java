package com.phil.flwanalytics.analytics.projection;

import com.phil.flwanalytics.analytics.model.Activity;
import com.phil.flwanalytics.analytics.model.Crop;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SingleCropByActivity {
    Crop crop;
    Activity activity;
    Double sum;

}
