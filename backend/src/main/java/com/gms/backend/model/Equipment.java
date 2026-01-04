package com.gms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Document(collection = "equipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Equipment {
    @Id
    private String id;

    private String name;
    private String type;
    private String status; // FUNCTIONAL, DAMAGED, UNDER_MAINTENANCE
    private LocalDate lastMaintenanceDate;
    private String imageUrl;
}
