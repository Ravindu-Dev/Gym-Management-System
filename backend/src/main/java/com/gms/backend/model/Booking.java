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
    private LocalDateTime bookingDate;
    private String status; // PENDING, ACCEPTED, REJECTED
    private String message;
}
