package com.phil.flwanalytics.analytics.services.impl;

import com.phil.flwanalytics.analytics.Repo.FoodRepo;
import com.phil.flwanalytics.analytics.model.Food;
import com.phil.flwanalytics.analytics.services.FoodService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class FoodServiceImpl implements FoodService {
    private final FoodRepo foodRepo;
    @Override
    public Food SaveCrop(Food food) {
        return foodRepo.save(food);
    }

    @Override
    public List<Food> getAll() {
        return foodRepo.findAll();
    }
}
