package com.phil.flwanalytics.analytics.services;

import com.phil.flwanalytics.analytics.model.Crop;
import com.phil.flwanalytics.analytics.model.Stage;

import java.util.List;

public interface StageService {
    Stage saveStage(Stage stage);
    List<Stage> getAll();
}
