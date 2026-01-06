package com.gms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Set;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;

    private String username;
    private String password;
    private String email;

    private String fullName;
    private String phoneNumber;
    private String address;
    private String bio;
    private String profileImageUrl;

    private String status; // PENDING, APPROVED, REJECTED
    private String specialization;
    private String gender; // For trainers
    private Integer age; // For trainers

    private Set<String> roles;
}
