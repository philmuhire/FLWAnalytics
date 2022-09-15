package com.phil.flwanalytics.analytics.api;

import com.phil.flwanalytics.analytics.Repo.StageRepo;
import com.phil.flwanalytics.analytics.model.Stage;
import com.phil.flwanalytics.analytics.projection.FoodProduce;
import com.phil.flwanalytics.analytics.services.StageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stage")
public class StageCtrl {
    private final StageService stageService;
    private final StageRepo stageRepo;

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN') or hasRole('ROLE_CTR_USER')")
    @GetMapping("/all")
    public ResponseEntity<List<Stage>> getStages(){
        return ResponseEntity.ok().body((stageService.getAll()));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?>saveStage(@RequestBody Stage stage) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/stage/add").toUriString());
        try {
            stage = stageService.saveStage(stage);
        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body(stage);
    }



    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<?>editStage(@RequestBody Stage stage) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/stage/edit").toUriString());
        try {
            stage = stageService.saveStage(stage);
        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body(stage);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?>deleteStageById(@PathVariable Long id) {
        try{
            stageRepo.deleteById(id);
            return ResponseEntity.ok().body("deleted");
        } catch (Exception e){
            return  ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<?>getStage(@PathVariable Long id) {
        Stage stage;
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/stage/getone").toUriString());
        try {
            stage = stageRepo.getById(id);
        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.ok(stage);
    }


}
