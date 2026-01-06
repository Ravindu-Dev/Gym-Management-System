package com.gms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    private String id;

    private String userId;
    private String userName;
    private String trainerId;
    private String trainerName;
    private String workoutType;
    private LocalDateTime bookingDate; // When the booking was created
    private LocalDateTime sessionDateTime; // When the training session is scheduled
    private String status; // PENDING, ACCEPTED, REJECTED
    private String message;

    // User physical details
    private Double userWeight; // in kg
    private Double userHeight; // in cm
    private String practicePreferences; // What the user wants to practice/focus on
}
