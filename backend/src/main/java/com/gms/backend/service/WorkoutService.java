package com.gms.backend.service;

import com.gms.backend.model.Workout;
import com.gms.backend.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WorkoutService {
    @Autowired
    WorkoutRepository workoutRepository;

    public List<Workout> getUserWorkouts(String userId) {
        return workoutRepository.findByUserId(userId);
    }

    public Workout logWorkout(Workout workout, String userId) {
        workout.setUserId(userId);
        if (workout.getDate() == null) {
            workout.setDate(LocalDate.now());
        }
        return workoutRepository.save(workout);
    }
}
