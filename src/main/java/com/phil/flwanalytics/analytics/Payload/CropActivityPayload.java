package com.phil.flwanalytics.analytics.Payload;

import lombok.Data;

@Data
public class CropActivityPayload {
    private String activityId;
    private String cropId;
    private String countryName;
    private Double lossPercentage;
    private Double lossQuantity;
    private Integer year;
    private String treatment;
    private String causeOfLoss;

}
