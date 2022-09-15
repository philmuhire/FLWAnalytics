package com.phil.flwanalytics.analytics.api;

import com.phil.flwanalytics.analytics.Payload.FoodProcessPayload;
import com.phil.flwanalytics.analytics.Payload.PageRequestPayload;
import com.phil.flwanalytics.analytics.Repo.FoodProcessRepo;
import com.phil.flwanalytics.analytics.model.FoodProcess;
import com.phil.flwanalytics.analytics.services.FoodProcessService;
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
public class FoodProcessCtrl {
    private final FoodProcessService foodProcessService;
    private final FoodProcessRepo foodProcessRepo;

    @GetMapping("/all")
    public ResponseEntity<List<FoodProcess>> getFoodProcess(){
        return ResponseEntity.ok().body((foodProcessService.getAll()));
    }
    @GetMapping("/summary")
    public ResponseEntity<List<?>> getCropSummary(){
        return ResponseEntity.ok().body((foodProcessRepo.summatePercentagePerYearAndcrop()));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?>saveFoodProcess(@RequestBody FoodProcessPayload cap) {
        FoodProcess foodProcess;
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/crop activity/save").toUriString());
        try {
            foodProcess = foodProcessService.addCropActivity(cap);
        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body(foodProcess);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/findprocesses")
    public ResponseEntity<List<FoodProcess>>getNFoodProcesses(@RequestBody PageRequestPayload prp) {
        return ResponseEntity.ok().body((foodProcessService.findNActivities(prp.getPage(), prp.getSize() )));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<?>getFoodProcess(@PathVariable Long id) {
        FoodProcess foodProcess;
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/crop activity/getone").toUriString());
        try {
            foodProcess = foodProcessRepo.getById(id);

        } catch (Exception exception){
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.ok(foodProcess);
    }
}

