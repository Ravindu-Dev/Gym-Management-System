package com.gms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    private String id;
    private String userId;
    private String planId;
    private Long amount; // in cents
    private String stripeSessionId;
    private String status; // PENDING, SUCCESS, FAILED
    private LocalDateTime createdAt;
}
