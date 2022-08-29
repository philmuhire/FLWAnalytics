package com.phil.flwanalytics.analytics.Repo;

import com.phil.flwanalytics.analytics.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepo extends JpaRepository<Country, String> {
    Country findByName(String name);
}
