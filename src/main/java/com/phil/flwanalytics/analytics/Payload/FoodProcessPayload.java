package com.phil.flwanalytics.analytics.Payload;

import lombok.Data;

@Data
public class FoodProcessPayload {
    private String processId;
    private String foodId;
    private String countryName;
    private Double produce;
    private Double lossPercentage;
    private Double lossQuantity;
    private Integer year;
    private String treatment;
    private String causeOfLoss;

}
