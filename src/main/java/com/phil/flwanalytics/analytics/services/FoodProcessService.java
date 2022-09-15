package com.phil.flwanalytics.analytics.services;

import com.phil.flwanalytics.analytics.Payload.FoodProcessPayload;
import com.phil.flwanalytics.analytics.model.FoodProcess;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FoodProcessService {
    void addCropActivity(FoodProcessPayload foodProcessPayload);
    List<FoodProcess> getAll();
    List<FoodProcess> findNActivities(Integer page, Integer size);
    List<FoodProcess> findNProcessPerProcess(Long id);
}
