package com.phil.flwanalytics.analytics.api;

import com.phil.flwanalytics.analytics.Payload.ActivityPayload;
import com.phil.flwanalytics.analytics.Repo.ActivityRepo;
import com.phil.flwanalytics.analytics.Repo.StageRepo;
import com.phil.flwanalytics.analytics.model.Activity;
import com.phil.flwanalytics.analytics.services.ActivityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController @Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/activity")
public class ActivityCtrl {
    private final ActivityService activityService;
    private final StageRepo stageRepo;
    private final ActivityRepo activityRepo;

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Activity>> getActivities(){
        return ResponseEntity.ok().body((activityService.getAll()));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?>saveActivity(@RequestBody ActivityPayload ap) {

        Activity activity;
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/activity/save").toUriString());
        try {
            log.info("trying in controller");
            log.info(ap.toString());
            activity = activityService.saveActivity(ap);

        } catch (Exception exception){
            log.info("in save acti catch");
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body(activity);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<?>getActivity(@PathVariable Long id) {
        Activity activity;
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/activity/getone").toUriString());
        try {
            activity = activityRepo.getById(id);
        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.ok(activity);
    }
}
