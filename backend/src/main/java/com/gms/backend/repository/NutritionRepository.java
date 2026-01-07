package com.gms.backend.repository;

import com.gms.backend.model.Nutrition;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.time.LocalDate;

public interface NutritionRepository extends MongoRepository<Nutrition, String> {
    List<Nutrition> findByUserId(String userId);

    List<Nutrition> findByUserIdAndDate(String userId, LocalDate date);
}
