package com.gms.backend.repository;

import com.gms.backend.model.GymClass;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface GymClassRepository extends MongoRepository<GymClass, String> {
    List<GymClass> findByStartTimeAfter(LocalDateTime now);
}
