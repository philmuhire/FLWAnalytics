package com.phil.flwanalytics.analytics.services.impl;

import com.phil.flwanalytics.analytics.Repo.StageRepo;
import com.phil.flwanalytics.analytics.model.Stage;
import com.phil.flwanalytics.analytics.services.StageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class StageServiceImpl implements StageService {
    private final StageRepo stageRepo;
    @Override
    public Stage saveStage(Stage stage) {
        return stageRepo.save(stage);
    }

    @Override
    public List<Stage> getAll() {
        return stageRepo.findAll();
    }
}
