package com.phil.flwanalytics.analytics.api;

import com.phil.flwanalytics.analytics.Repo.CropRepo;
import com.phil.flwanalytics.analytics.model.Activity;
import com.phil.flwanalytics.analytics.model.Crop;
import com.phil.flwanalytics.analytics.services.CropService;
import com.phil.flwanalytics.authentication.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/crop")
public class CropCtrl {
    private final CropService cropService;
    private final CropRepo cropRepo;
    @GetMapping("/all")
    public ResponseEntity<List<Crop>> getCountries(){
        return ResponseEntity.ok().body((cropService.getAll()));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?>saveCrop(@RequestBody Crop crop) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        try {
            crop = cropService.SaveCrop(crop);
        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body(crop);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<?>getCrop(@PathVariable Long id) {
        Crop crop;
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/crop/getone").toUriString());
        try {
            crop = cropRepo.getById(id);
        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.ok(crop);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @GetMapping("/checksysadmin")
    public String checkingsysadmin(){
        return "sysadminchecked";
    }
    @PreAuthorize("hasRole('ROLE_CTR_ADMIN')")
    @GetMapping("/checkctradmin")
    public String checkctradmin(){
        return "ctradminchecked";
    }
    @PreAuthorize("hasRole('ROLE_CTR_USER')")
    @GetMapping("/checkctruser")
    public String checkingctruser(){
        return "ctruserchecked";
    }

}
