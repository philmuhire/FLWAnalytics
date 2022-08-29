package com.phil.flwanalytics.analytics.services;

import com.phil.flwanalytics.analytics.model.Crop;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CropService {
    Crop SaveCrop(Crop crop);
    List<Crop> getAll();
}
