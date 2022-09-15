package com.phil.flwanalytics.analytics.services.impl;

import com.phil.flwanalytics.analytics.Payload.FoodProcessPayload;
import com.phil.flwanalytics.analytics.Repo.*;
import com.phil.flwanalytics.analytics.model.Process;
import com.phil.flwanalytics.analytics.model.Country;
import com.phil.flwanalytics.analytics.model.Food;
import com.phil.flwanalytics.analytics.model.FoodProcess;
import com.phil.flwanalytics.analytics.services.FoodProcessService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class FoodProcessServiceImpl implements FoodProcessService {
    private final FoodProcessRepo foodProcessRepo;

    private final FoodPagination foodPagination;
    private final ProcessRepo processRepo;
    private final FoodRepo foodRepo;
    private final CountryRepo countryRepo;
    @Override
    public FoodProcess addCropActivity(FoodProcessPayload cap) {
        Food food = foodRepo.getById(Long.parseLong(cap.getFoodId()));
        Country country = countryRepo.findByName(cap.getCountryName());
        Process process = processRepo.getById(Long.parseLong(cap.getProcessId()));

        return foodProcessRepo.save(new FoodProcess(food, process, country, cap.getYear(), cap.getProduce(), cap.getLossPercentage(), cap.getProduce()*(cap.getLossPercentage()/100) , cap.getCauseOfLoss(), cap.getTreatment()));
    }

    @Override
    public List<FoodProcess> getAll() {
        return foodProcessRepo.findAll();
    }

    @Override
    public List<FoodProcess> findNActivities(Integer page, Integer size) {
        return foodProcessRepo.findAll(PageRequest.of(page, size)).getContent();
//        return foodPagination.findAll(PageRequest.of(page, size)).getContent();
    }
}
