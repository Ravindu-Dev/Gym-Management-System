package com.gms.backend.controller;

import com.gms.backend.model.Nutrition;
import com.gms.backend.service.NutritionService;
import com.gms.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/nutrition")
public class NutritionController {

    @Autowired
    private NutritionService nutritionService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> logNutrition(@RequestBody Nutrition nutrition, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(nutritionService.logNutrition(userDetails.getId(), nutrition));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Nutrition>> getMyNutrition(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(nutritionService.getMyNutrition(userDetails.getId()));
    }

    @GetMapping("/me/today")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Nutrition>> getMyNutritionToday(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(nutritionService.getMyNutritionByDate(userDetails.getId(), LocalDate.now()));
    }

    @GetMapping("/me/date")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Nutrition>> getMyNutritionByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(nutritionService.getMyNutritionByDate(userDetails.getId(), date));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteNutrition(@PathVariable String id) {
        nutritionService.deleteNutrition(id);
        return ResponseEntity.ok().build();
    }
}
