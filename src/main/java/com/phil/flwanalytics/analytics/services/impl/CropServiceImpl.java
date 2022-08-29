package com.phil.flwanalytics.analytics.services.impl;

import com.phil.flwanalytics.analytics.Repo.CropRepo;
import com.phil.flwanalytics.analytics.model.Crop;
import com.phil.flwanalytics.analytics.services.CropService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CropServiceImpl implements CropService {
    private final CropRepo cropRepo;
    @Override
    public Crop SaveCrop(Crop crop) {
        return cropRepo.save(crop);
    }

    @Override
    public List<Crop> getAll() {
        return cropRepo.findAll();
    }
}
