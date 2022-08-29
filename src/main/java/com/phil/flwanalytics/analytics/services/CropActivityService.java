package com.phil.flwanalytics.analytics.services;

import com.phil.flwanalytics.analytics.Payload.CropActivityPayload;
import com.phil.flwanalytics.analytics.model.Crop;
import com.phil.flwanalytics.analytics.model.CropActivity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CropActivityService {
    CropActivity addCropActivity(CropActivityPayload cropActivityPayload);
    List<CropActivity> getAll();
}
