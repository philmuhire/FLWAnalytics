package com.phil.flwanalytics.analytics.api;

import com.phil.flwanalytics.analytics.Repo.FoodRepo;
import com.phil.flwanalytics.analytics.model.Food;
import com.phil.flwanalytics.analytics.services.FoodService;
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
public class FoodCtrl {
    private final FoodService foodService;
    private final FoodRepo foodRepo;

    @GetMapping("/all")
    public ResponseEntity<List<Food>> getCountries() {
        return ResponseEntity.ok().body((foodService.getAll()));
    }

    @GetMapping("/one")
    public ResponseEntity<Food> getOne() {
        return ResponseEntity.ok().body((foodRepo.findFirstByOrderByNameDesc()));
    }

    @GetMapping("/singleByAct/{id}")
    public ResponseEntity<List<?>> getSingleFoodByActivity(@PathVariable Long id) {
        return ResponseEntity.ok().body((foodRepo.summatePercentagePerProcessAndFood(id)));
    }

    @GetMapping("/singleByYear/{id}")
    public ResponseEntity<List<?>> getSingleFoodByYear(@PathVariable Long id) {
        return ResponseEntity.ok().body((foodRepo.summatePercentagePerYearAndFood(id)));
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?> saveCrop(@RequestBody Food food) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        try {
            food = foodService.SaveCrop(food);
        } catch (Exception exception) {
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.created(uri).body(food);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN') or hasRole('ROLE_CTR_ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<?> getCrop(@PathVariable Long id) {
        Food food;
        URI uri = URI
                .create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/food/getone").toUriString());
        try {
            food = foodRepo.getById(id);
        } catch (Exception exception) {
            return (ResponseEntity<?>) ResponseEntity.badRequest().header(exception.getMessage());
        }
        return ResponseEntity.ok(food);
    }

    @PreAuthorize("hasRole('ROLE_SYS_ADMIN')")
    @GetMapping("/checksysadmin")
    public String checkingsysadmin() {
        return "sysadminchecked";
    }

    @PreAuthorize("hasRole('ROLE_CTR_ADMIN')")
    @GetMapping("/checkctradmin")
    public String checkctradmin() {
        return "ctradminchecked";
    }

    @PreAuthorize("hasRole('ROLE_CTR_USER')")
    @GetMapping("/checkctruser")
    public String checkingctruser() {
        return "ctruserchecked";
    }

}
