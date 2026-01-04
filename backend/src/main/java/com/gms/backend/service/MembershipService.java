package com.gms.backend.service;

import com.gms.backend.model.MembershipPlan;
import com.gms.backend.model.MemberSubscription;
import com.gms.backend.model.User;
import com.gms.backend.repository.MembershipPlanRepository;
import com.gms.backend.repository.MemberSubscriptionRepository;
import com.gms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class MembershipService {
    @Autowired
    MembershipPlanRepository planRepository;

    @Autowired
    MemberSubscriptionRepository subscriptionRepository;

    @Autowired
    UserRepository userRepository;

    public List<MembershipPlan> getAllPlans() {
        return planRepository.findAll();
    }

    public MembershipPlan createPlan(MembershipPlan plan) {
        return planRepository.save(plan);
    }

    public MemberSubscription subscribe(String userId, String planId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        MembershipPlan plan = planRepository.findById(planId).orElseThrow(() -> new RuntimeException("Plan not found"));

        MemberSubscription subscription = new MemberSubscription();
        subscription.setUser(user);
        subscription.setPlan(plan);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusMonths(plan.getDurationInMonths()));
        subscription.setStatus("ACTIVE");

        return subscriptionRepository.save(subscription);
    }

    public List<MemberSubscription> getUserSubscriptions(String userId) {
        return subscriptionRepository.findByUserId(userId);
    }
}
