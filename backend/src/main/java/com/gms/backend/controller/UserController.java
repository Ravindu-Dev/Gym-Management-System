package com.gms.backend.controller;

import com.gms.backend.dto.MessageResponse;
import com.gms.backend.dto.UserProfileDTO;
import com.gms.backend.model.User;
import com.gms.backend.repository.UserRepository;
import com.gms.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        UserProfileDTO profile = new UserProfileDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getBio(),
                user.getProfileImageUrl(),
                user.getRoles(),
                user.getSpecialization(),
                user.getGender(),
                user.getAge());

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserProfileDTO profileDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        user.setFullName(profileDTO.getFullName());
        user.setPhoneNumber(profileDTO.getPhoneNumber());
        user.setAddress(profileDTO.getAddress());
        user.setBio(profileDTO.getBio());
        user.setProfileImageUrl(profileDTO.getProfileImageUrl());

        // Update trainer-specific fields if provided
        if (profileDTO.getSpecialization() != null) {
            user.setSpecialization(profileDTO.getSpecialization());
        }
        if (profileDTO.getGender() != null) {
            user.setGender(profileDTO.getGender());
        }
        if (profileDTO.getAge() != null) {
            user.setAge(profileDTO.getAge());
        }

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Profile updated successfully!"));
    }

    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        userRepository.delete(user);

        return ResponseEntity.ok(new MessageResponse("User account deleted successfully!"));
    }
}
