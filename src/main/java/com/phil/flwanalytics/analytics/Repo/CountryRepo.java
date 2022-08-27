package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepo extends JpaRepository<Country, Long> {
}
