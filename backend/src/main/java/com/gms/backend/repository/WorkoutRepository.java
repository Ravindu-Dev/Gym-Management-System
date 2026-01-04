package com.gms.backend.repository;

import com.gms.backend.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
    List<Workout> findByUserId(String userId);
}
