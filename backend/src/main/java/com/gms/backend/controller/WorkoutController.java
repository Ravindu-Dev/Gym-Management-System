package com.gms.backend.controller;

import com.gms.backend.model.Workout;
import com.gms.backend.security.services.UserDetailsImpl;
import com.gms.backend.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
    @Autowired
    WorkoutService workoutService;

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Workout> getMyWorkouts() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return workoutService.getUserWorkouts(userDetails.getId());
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Workout logWorkout(@RequestBody Workout workout) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return workoutService.logWorkout(workout, userDetails.getId());
    }
}
