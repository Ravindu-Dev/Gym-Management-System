package com.gms.backend.controller;

import com.gms.backend.dto.MessageResponse;
import com.gms.backend.model.User;
import com.gms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/trainers")
public class AdminTrainerController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getPendingTrainers() {
        List<User> trainers = userRepository.findByStatus("PENDING");
        return ResponseEntity.ok(trainers);
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> approveTrainer(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Trainer not found."));

        user.setStatus("APPROVED");
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Trainer approved successfully!"));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> rejectTrainer(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Trainer not found."));

        user.setStatus("REJECTED");
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Trainer rejected successfully!"));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllTrainers() {
        List<User> trainers = userRepository.findByRolesContains("ROLE_TRAINER");
        return ResponseEntity.ok(trainers);
    }
}
