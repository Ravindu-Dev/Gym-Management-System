package com.gms.backend.repository;

import com.gms.backend.model.Equipment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EquipmentRepository extends MongoRepository<Equipment, String> {
    List<Equipment> findByStatus(String status);
}
