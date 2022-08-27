package com.phil.flwanalytics.analytics.services.impl;

import com.phil.flwanalytics.analytics.Repo.CountryRepo;
import com.phil.flwanalytics.analytics.model.Country;
import com.phil.flwanalytics.analytics.services.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepo countryRepo;

    @Override
    public Country saveCountry(Country country) {

        return countryRepo.save(country);
    }
}
