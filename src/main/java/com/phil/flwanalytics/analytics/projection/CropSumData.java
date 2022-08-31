package com.phil.flwanalytics.analytics.projection;

import com.phil.flwanalytics.analytics.model.Crop;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CropSumData {
    Crop crop;
    Integer year;
    Double sum;


}
