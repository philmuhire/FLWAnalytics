package com.phil.flwanalytics.analytics.api;

import com.phil.flwanalytics.analytics.Payload.ProcessEditPayload;
import com.phil.flwanalytics.analytics.Payload.ProcessPayload;
import com.phil.flwanalytics.analytics.Repo.FoodProcessRepo;
import com.phil.flwanalytics.analytics.Repo.ProcessRepo;
import com.phil.flwanalytics.analytics.Repo.StageRepo;
import com.phil.flwanalytics.analytics.model.Process;
import com.phil.flwanalytics.analytics.model.Stage;
import com.phil.flwanalytics.analytics.services.ProcessService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/activity")
public class ProcessCtrl {
    private final ProcessService processService;
    private final StageRepo stageRepo;
    private final ProcessRepo processRepo;
    private final FoodProcessRepo foodProcessRepo;

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Process>> getActivities() {
        return ResponseEntity.ok().body((processService.getAll()));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?> saveActivity(@RequestBody ProcessPayload ap) {

        Process process;
        URI uri = URI
                .create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/process/save").toUriString());
        try {
            log.info("trying in controller");
            log.info(ap.toString());
            processService.saveActivity(ap);

        } catch (Exception exception) {
            log.info("in save acti catch");
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body("process created");
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProcessById(@PathVariable Long id) {
        try {
            foodProcessRepo.deleteAllByProcessId(id);
            processRepo.deleteById(id);
            return ResponseEntity.ok().body("deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<?> getActivity(@PathVariable Long id) {
        Process process;
        URI uri = URI
                .create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/process/getone").toUriString());
        try {
            process = processRepo.getById(id);
        } catch (Exception exception) {
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.ok(process);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<?> editProcess(@RequestBody ProcessEditPayload ape) {
        Process process;
        URI uri = URI
                .create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/process/save").toUriString());
        try {
            log.info("trying in controller");
            log.info(ape.toString());
            processService.editActivity(ape);

        } catch (Exception exception) {
            log.info("in save acti catch");
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body("process edited");
    }
}
