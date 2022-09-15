package com.phil.flwanalytics.analytics.services;

import com.phil.flwanalytics.analytics.model.Food;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FoodService {
    Food SaveCrop(Food food);
    List<Food> getAll();
}
