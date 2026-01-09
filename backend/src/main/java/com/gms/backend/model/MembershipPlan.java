package com.gms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Document(collection = "membership_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MembershipPlan {
    @Id
    private String id;

    private String name;
    private String description;
    private double price;
    private int durationInMonths;
    private List<String> features; // Features unlocked by this plan
}
