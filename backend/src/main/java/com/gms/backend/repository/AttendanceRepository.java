package com.gms.backend.repository;

import com.gms.backend.model.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends MongoRepository<Attendance, String> {
    List<Attendance> findByUserId(String userId);

    Optional<Attendance> findTopByUserIdOrderByCheckInTimeDesc(String userId);
}
