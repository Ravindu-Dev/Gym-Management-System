package com.gms.backend.service;

import com.gms.backend.model.Nutrition;
import com.gms.backend.repository.NutritionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDate;

@Service
public class NutritionService {

    @Autowired
    private NutritionRepository nutritionRepository;

    public Nutrition logNutrition(String userId, Nutrition nutrition) {
        nutrition.setUserId(userId);
        if (nutrition.getDate() == null) {
            nutrition.setDate(LocalDate.now());
        }
        return nutritionRepository.save(nutrition);
    }

    public List<Nutrition> getMyNutrition(String userId) {
        return nutritionRepository.findByUserId(userId);
    }

    public List<Nutrition> getMyNutritionByDate(String userId, LocalDate date) {
        return nutritionRepository.findByUserIdAndDate(userId, date);
    }

    public void deleteNutrition(String id) {
        nutritionRepository.deleteById(id);
    }
}
