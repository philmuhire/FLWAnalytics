package com.phil.flwanalytics.analytics.services.impl;

import com.phil.flwanalytics.analytics.Repo.CountryRepo;
import com.phil.flwanalytics.analytics.model.Country;
import com.phil.flwanalytics.analytics.services.CountryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @RequiredArgsConstructor
@Transactional
@Slf4j
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepo countryRepo;

    @Override
    public Country saveCountry(Country country) {
        return countryRepo.save(country);
    }

    @Override
    public List<Country> getAll() {
        return countryRepo.findAll();
    }
}
