package com.phil.flwanalytics.analytics.services;

import com.phil.flwanalytics.analytics.Payload.ActivityPayload;
import com.phil.flwanalytics.analytics.model.Activity;
import com.phil.flwanalytics.analytics.model.Crop;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ActivityService {
    Activity saveActivity(ActivityPayload activityPayload);
    List<Activity> getAll();
}
