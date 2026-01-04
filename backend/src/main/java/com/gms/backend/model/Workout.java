package com.gms.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "workouts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Workout {
    @Id
    private String id;
    private String userId;
    private LocalDate date;
    private String type; // e.g., "Strength", "Cardio"
    private int durationMinutes;
    private String notes;
    private List<Exercise> exercises;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Exercise {
        private String name;
        private int sets;
        private int reps;
        private double weight;
    }
}
