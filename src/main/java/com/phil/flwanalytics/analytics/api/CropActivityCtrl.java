package com.phil.flwanalytics.analytics.api;

import com.phil.flwanalytics.analytics.Payload.CropActivityPayload;
import com.phil.flwanalytics.analytics.Repo.ActivityRepo;
import com.phil.flwanalytics.analytics.Repo.CropActivityRepo;
import com.phil.flwanalytics.analytics.model.Activity;
import com.phil.flwanalytics.analytics.model.Crop;
import com.phil.flwanalytics.analytics.model.CropActivity;
import com.phil.flwanalytics.analytics.services.ActivityService;
import com.phil.flwanalytics.analytics.services.CropActivityService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/cropactivity")
public class CropActivityCtrl {
    private final CropActivityService cropActivityService;
    private final CropActivityRepo cropActivityRepo;

    @GetMapping("/all")
    public ResponseEntity<List<CropActivity>> getCropActivity(){
        return ResponseEntity.ok().body((cropActivityService.getAll()));
    }
    @GetMapping("/summary")
    public ResponseEntity<List<?>> getCropSummary(){
        return ResponseEntity.ok().body((cropActivityRepo.summatePercentagePerYearAndcrop()));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?>saveCropActivity(@RequestBody CropActivityPayload cap) {
        CropActivity cropActivity;
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/crop activity/save").toUriString());
        try {
            cropActivity = cropActivityService.addCropActivity(cap);
        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body(cropActivity);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<?>getCropActivity(@PathVariable Long id) {
        CropActivity cropActivity;
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/crop activity/getone").toUriString());
        try {
            cropActivity = cropActivityRepo.getById(id);

        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.ok(cropActivity);
    }
}

