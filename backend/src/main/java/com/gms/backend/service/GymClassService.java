package com.gms.backend.service;

import com.gms.backend.model.GymClass;
import com.gms.backend.repository.GymClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GymClassService {
    @Autowired
    GymClassRepository gymClassRepository;

    public List<GymClass> getUpcomingClasses() {
        return gymClassRepository.findByStartTimeAfter(LocalDateTime.now());
    }

    public GymClass createClass(GymClass gymClass) {
        return gymClassRepository.save(gymClass);
    }

    @SuppressWarnings("null")
    public void deleteClass(String id) {
        gymClassRepository.deleteById(id);
    }

    public GymClass bookClass(String classId, String userId) throws Exception {
        GymClass gymClass = gymClassRepository.findById(classId)
                .orElseThrow(() -> new Exception("Class not found"));

        if (gymClass.getEnrolledMemberIds().size() >= gymClass.getCapacity()) {
            throw new Exception("Class is full");
        }

        if (gymClass.getEnrolledMemberIds().contains(userId)) {
            throw new Exception("User already enrolled");
        }

        gymClass.getEnrolledMemberIds().add(userId);
        return gymClassRepository.save(gymClass);
    }

    public GymClass cancelBooking(String classId, String userId) throws Exception {
        GymClass gymClass = gymClassRepository.findById(classId)
                .orElseThrow(() -> new Exception("Class not found"));

        gymClass.getEnrolledMemberIds().remove(userId);
        return gymClassRepository.save(gymClass);
    }
}
