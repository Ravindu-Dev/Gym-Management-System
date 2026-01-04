package com.gms.backend.controller;

import com.gms.backend.model.Attendance;
import com.gms.backend.security.services.UserDetailsImpl;
import com.gms.backend.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    AttendanceService attendanceService;

    @GetMapping("/my")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Attendance> getMyAttendance() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return attendanceService.getUserAttendance(userDetails.getId());
    }

    @PostMapping("/checkin/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> checkInMember(@PathVariable String userId) {
        return ResponseEntity.ok(attendanceService.checkIn(userId));
    }

    @PostMapping("/checkout/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> checkOutMember(@PathVariable String userId) {
        try {
            return ResponseEntity.ok(attendanceService.checkOut(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }
}
