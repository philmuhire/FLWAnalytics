package com.phil.flwanalytics.analytics.services.impl;

import com.phil.flwanalytics.analytics.Payload.ActivityPayload;
import com.phil.flwanalytics.analytics.Repo.ActivityRepo;
import com.phil.flwanalytics.analytics.Repo.StageRepo;
import com.phil.flwanalytics.analytics.model.Activity;
import com.phil.flwanalytics.analytics.model.Stage;
import com.phil.flwanalytics.analytics.services.ActivityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ActivityServiceImpl implements ActivityService {
    private final ActivityRepo activityRepo;
    private final StageRepo stageRepo;

    @Override
    public Activity saveActivity(ActivityPayload ap) {
        Stage stage = stageRepo.getById(Long.parseLong(ap.getStageId()));
        Activity activity = new Activity(ap.getName(), ap.getDescription(), stage);
        System.out.println(activity.getStage().getName());
        return activityRepo.save(activity);
    }

    @Override
    public List<Activity> getAll() {
        return activityRepo.findAll();
    }
}
