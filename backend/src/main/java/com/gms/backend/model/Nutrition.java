package com.gms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Document(collection = "nutrition")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Nutrition {
    @Id
    private String id;

    private String userId;

    private LocalDate date;
    private String mealName; // e.g., "Breakfast", "Lunch"
    private String foodName;
    private Integer calories;
    private Integer protein;
    private Integer carbs;
    private Integer fat;
}
