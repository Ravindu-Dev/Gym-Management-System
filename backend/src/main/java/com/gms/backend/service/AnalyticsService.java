package com.gms.backend.service;

import com.gms.backend.dto.DashboardStats;
import com.gms.backend.model.MemberSubscription;
import com.gms.backend.repository.EquipmentRepository;
import com.gms.backend.repository.GymClassRepository;
import com.gms.backend.repository.MemberSubscriptionRepository;
import com.gms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MemberSubscriptionRepository subscriptionRepository;

    @Autowired
    EquipmentRepository equipmentRepository;

    @Autowired
    GymClassRepository gymClassRepository;

    public DashboardStats getStats() {
        long totalMembers = userRepository.count();
        long totalEquipment = equipmentRepository.count();
        long totalClasses = gymClassRepository.count();

        // Calculate simple revenue based on all subscriptions (in a real app, this
        // would be monthly/yearly logic)
        List<MemberSubscription> subs = subscriptionRepository.findAll();
        double totalRevenue = subs.stream()
                .mapToDouble(s -> s.getPlan().getPrice())
                .sum();

        return new DashboardStats(totalMembers, totalRevenue, totalEquipment, totalClasses);
    }
}
