package com.phil.flwanalytics.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FoodProcess {
    String country;
    String crop;
    String activity;
    Integer year;
    Double lossPercentage;
    Double lossQuantity;
    String treatment;
    String causeOfLoss;
}
