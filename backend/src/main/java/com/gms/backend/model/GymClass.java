package com.gms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "gym_classes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GymClass {
    @Id
    private String id;

    private String name;
    private String instructor;
    private LocalDateTime startTime;
    private int durationMinutes;
    private int capacity;

    private List<String> enrolledMemberIds = new ArrayList<>();
}
