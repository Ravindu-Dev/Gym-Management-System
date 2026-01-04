package com.gms.backend.service;

import com.gms.backend.model.Attendance;
import com.gms.backend.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {
    @Autowired
    AttendanceRepository attendanceRepository;

    public List<Attendance> getUserAttendance(String userId) {
        return attendanceRepository.findByUserId(userId);
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Attendance checkIn(String userId) {
        // Check if already checked in without checkout
        Optional<Attendance> last = attendanceRepository.findTopByUserIdOrderByCheckInTimeDesc(userId);
        if (last.isPresent() && last.get().getCheckOutTime() == null) {
            // Auto checkout previous session or throw error? Let's just create new checkin
            // for simplicity
            // or maybe close the previous one?
            // For this internship project, let's just allow new checkin.
        }

        Attendance attendance = new Attendance();
        attendance.setUserId(userId);
        attendance.setCheckInTime(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    public Attendance checkOut(String userId) throws Exception {
        Optional<Attendance> last = attendanceRepository.findTopByUserIdOrderByCheckInTimeDesc(userId);
        if (last.isPresent() && last.get().getCheckOutTime() == null) {
            Attendance attendance = last.get();
            attendance.setCheckOutTime(LocalDateTime.now());
            return attendanceRepository.save(attendance);
        } else {
            throw new Exception("No active check-in found for user");
        }
    }
}
