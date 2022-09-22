package com.phil.flwanalytics.analytics.api;

import com.phil.flwanalytics.analytics.Payload.FoodProcessPayload;
import com.phil.flwanalytics.analytics.Payload.PageRequestPayload;
import com.phil.flwanalytics.analytics.Repo.FoodProcessRepo;
import com.phil.flwanalytics.analytics.model.FoodProcess;
import com.phil.flwanalytics.analytics.projection.FoodProduce;
import com.phil.flwanalytics.analytics.services.FoodProcessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Transactional
@CrossOrigin(origins = "*")
@RequestMapping("/api/cropactivity")
public class FoodProcessCtrl {
    private final FoodProcessService foodProcessService;
    private final FoodProcessRepo foodProcessRepo;

    @GetMapping("/all")
    public ResponseEntity<List<FoodProcess>> getFoodProcess() {
        return ResponseEntity.ok().body((foodProcessService.getAll()));
    }

    @GetMapping("/summary")
    public ResponseEntity<List<?>> getCropSummary() {
        return ResponseEntity.ok().body((foodProcessRepo.summatePercentagePerYearAndcrop()));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN') or hasRole('ROLE_CTR_USER')")
    @PostMapping("/add")
    public ResponseEntity<?> saveFoodProcess(@RequestBody FoodProcessPayload cap) {
        FoodProcess foodProcess;
        URI uri = URI.create(
                ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/crop activity/save").toUriString());
        try {
            foodProcessService.addCropActivity(cap);
        } catch (Exception exception) {
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body("object created");
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFPById(@PathVariable Long id) {
        try {
            foodProcessRepo.deleteById(id);
            return ResponseEntity.ok().body("deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    // @PostMapping("/edit")
    // public ResponseEntity<?>editFoodProcess(@RequestBody FoodProcessPayload cap)
    // {
    // FoodProcess foodProcess;
    // URI uri =
    // URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/crop
    // activity/save").toUriString());
    // try {
    //
    // foodProcess = foodProcessService.addCropActivity(cap);
    // } catch (Exception exception){
    // return (ResponseEntity<?>)
    // ResponseEntity.badRequest().header(exception.getMessage());
    // }
    // return ResponseEntity.created(uri).body(foodProcess);
    // }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN') or hasRole('ROLE_CTR_USER')")
    @PostMapping("/findprocesses")
    public ResponseEntity<List<FoodProcess>> getNFoodProcesses(@RequestBody PageRequestPayload prp) {
        return ResponseEntity.ok().body((foodProcessService.findNActivities(prp.getPage(), prp.getSize())));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<?> getFoodProcess(@PathVariable Long id) {
        FoodProcess foodProcess;
        URI uri = URI.create(
                ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/crop activity/getone").toUriString());
        try {
            foodProcess = foodProcessRepo.getById(id);

        } catch (Exception exception) {
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.ok(foodProcess);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN') or hasRole('ROLE_CTR_USER')")
    @GetMapping("/findproduce")
    public ResponseEntity<List<FoodProduce>> getNFoodProcesses() {
        return ResponseEntity.ok().body((foodProcessRepo.getProduceOfAllYears()));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN') or hasRole('ROLE_CTR_USER')")
    @GetMapping("/findproduce/{id}")
    public ResponseEntity<List<FoodProduce>> getNFoodProcesses(@PathVariable Long id) {
        return ResponseEntity.ok().body((foodProcessRepo.getProducePerCropOfAllYears(id)));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN') or hasRole('ROLE_CTR_USER')")
    @GetMapping("/findloss/{id}")
    public ResponseEntity<List<FoodProcess>> getNFoodProcessesPerProcess(@PathVariable Long id) {
        return ResponseEntity.ok().body(foodProcessService.findNProcessPerProcess(id));
    }
}
