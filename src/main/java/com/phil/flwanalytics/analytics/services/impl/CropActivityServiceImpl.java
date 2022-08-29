package com.phil.flwanalytics.analytics.services.impl;

import com.phil.flwanalytics.analytics.Payload.CropActivityPayload;
import com.phil.flwanalytics.analytics.Repo.ActivityRepo;
import com.phil.flwanalytics.analytics.Repo.CountryRepo;
import com.phil.flwanalytics.analytics.Repo.CropActivityRepo;
import com.phil.flwanalytics.analytics.Repo.CropRepo;
import com.phil.flwanalytics.analytics.model.Activity;
import com.phil.flwanalytics.analytics.model.Country;
import com.phil.flwanalytics.analytics.model.Crop;
import com.phil.flwanalytics.analytics.model.CropActivity;
import com.phil.flwanalytics.analytics.services.CropActivityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CropActivityServiceImpl implements CropActivityService {
    private final CropActivityRepo cropActivityRepo;
    private final ActivityRepo activityRepo;
    private final CropRepo cropRepo;
    private final CountryRepo countryRepo;
    @Override
    public CropActivity addCropActivity(CropActivityPayload cap) {
        Crop crop = cropRepo.getById(Long.parseLong(cap.getCropId()));
        Country country = countryRepo.findByName(cap.getCountryName());
        Activity activity = activityRepo.getById(Long.parseLong(cap.getActivityId()));

        return cropActivityRepo.save(new CropActivity(crop, activity, country, cap.getYear(), cap.getLossPercentage(), cap.getLossQuantity(), cap.getCauseOfLoss(), cap.getTreatment()));
    }

    @Override
    public List<CropActivity> getAll() {
        return cropActivityRepo.findAll();
    }
}
