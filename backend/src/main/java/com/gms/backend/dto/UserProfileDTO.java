package com.gms.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    private String id;
    private String username;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String bio;
    private String profileImageUrl;
    private Set<String> roles;

    // Trainer-specific fields
    private String specialization;
    private String gender;
    private Integer age;
}
