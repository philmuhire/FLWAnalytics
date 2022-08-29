package com.phil.flwanalytics.analytics.api;

import com.phil.flwanalytics.analytics.Repo.CountryRepo;
import com.phil.flwanalytics.analytics.model.Country;
import com.phil.flwanalytics.analytics.services.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/country")
public class CountryCtrl {

    private final CountryService countryService;
    private final CountryRepo countryRepo;
    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN') or hasRole('ROLE_CTR_USER')")
    @GetMapping("/all")
    public ResponseEntity<List<Country>> getCountries(){
        return ResponseEntity.ok().body((countryService.getAll()));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?>saveCountry(@RequestBody Country country) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/country/add").toUriString());
        try {
            country = countryService.saveCountry(country);
        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body(country);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')or hasRole('ROLE_CTR_USER')")
    @PostMapping("/{name}")
    public ResponseEntity<?>getCountry(@PathVariable String name) {
        Country country;
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/country/getone").toUriString());
        try {
            country = countryRepo.findByName(name);
        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.ok(country);
    }


}
