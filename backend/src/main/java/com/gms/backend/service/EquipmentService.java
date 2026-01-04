package com.gms.backend.service;

import com.gms.backend.model.Equipment;
import com.gms.backend.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EquipmentService {
    @Autowired
    EquipmentRepository equipmentRepository;

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment addEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public Equipment updateEquipment(String id, Equipment equipment) {
        if (equipmentRepository.existsById(id)) {
            equipment.setId(id);
            return equipmentRepository.save(equipment);
        }
        return null;
    }

    public void deleteEquipment(String id) {
        equipmentRepository.deleteById(id);
    }
}
