package com.phil.flwanalytics.analytics.services;

import com.phil.flwanalytics.analytics.model.Country;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CountryService {
    Country saveCountry(Country country);
    List<Country> getAll();
}
