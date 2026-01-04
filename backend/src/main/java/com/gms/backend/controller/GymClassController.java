package com.gms.backend.controller;

import com.gms.backend.model.GymClass;
import com.gms.backend.service.GymClassService;
import com.gms.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/classes")
public class GymClassController {

    @Autowired
    GymClassService gymClassService;

    @GetMapping
    public List<GymClass> getUpcomingClasses() {
        return gymClassService.getUpcomingClasses();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public GymClass createClass(@RequestBody GymClass gymClass) {
        return gymClassService.createClass(gymClass);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteClass(@PathVariable String id) {
        gymClassService.deleteClass(id);
    }

    @PostMapping("/{id}/book")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> bookClass(@PathVariable String id) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            GymClass updatedClass = gymClassService.bookClass(id, userDetails.getId());
            return ResponseEntity.ok(updatedClass);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/book")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> cancelBooking(@PathVariable String id) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            GymClass updatedClass = gymClassService.cancelBooking(id, userDetails.getId());
            return ResponseEntity.ok(updatedClass);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
