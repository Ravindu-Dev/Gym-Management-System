package com.gms.backend.service;

import com.gms.backend.model.MemberSubscription;
import com.gms.backend.model.MembershipPlan;
import com.gms.backend.repository.MemberSubscriptionRepository;
import com.gms.backend.repository.MembershipPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {

    @Autowired
    MemberSubscriptionRepository subscriptionRepository;

    @Autowired
    MembershipPlanRepository planRepository;

    /**
     * Get the user's active subscription (if any)
     */
    public Optional<MemberSubscription> getActiveSubscription(String userId) {
        List<MemberSubscription> subscriptions = subscriptionRepository.findByUserId(userId);
        return subscriptions.stream()
                .filter(s -> "ACTIVE".equals(s.getStatus()) &&
                        s.getEndDate() != null &&
                        s.getEndDate().isAfter(LocalDate.now()))
                .findFirst();
    }

    /**
     * Check if user has access to a specific feature
     */
    public boolean hasFeatureAccess(String userId, String feature) {
        Optional<MemberSubscription> activeSub = getActiveSubscription(userId);

        if (activeSub.isEmpty()) {
            return false; // No active subscription
        }

        String planId = activeSub.get().getPlanId();
        Optional<MembershipPlan> plan = planRepository.findById(planId);

        if (plan.isEmpty() || plan.get().getFeatures() == null) {
            return false;
        }

        return plan.get().getFeatures().contains(feature);
    }

    /**
     * Get the user's plan tier name
     * Returns "FREE", "BASIC", "PREMIUM", or "ANNUAL"
     */
    public String getUserPlanTier(String userId) {
        Optional<MemberSubscription> activeSub = getActiveSubscription(userId);

        if (activeSub.isEmpty()) {
            return "FREE";
        }

        String planId = activeSub.get().getPlanId();
        Optional<MembershipPlan> plan = planRepository.findById(planId);

        return plan.map(p -> p.getName().toUpperCase()).orElse("FREE");
    }

    /**
     * Get the user's active subscription with plan details populated
     */
    public Optional<SubscriptionWithPlan> getActiveSubscriptionWithPlan(String userId) {
        Optional<MemberSubscription> activeSub = getActiveSubscription(userId);

        if (activeSub.isEmpty()) {
            return Optional.empty();
        }

        MemberSubscription sub = activeSub.get();
        Optional<MembershipPlan> plan = planRepository.findById(sub.getPlanId());

        if (plan.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(new SubscriptionWithPlan(sub, plan.get()));
    }

    /**
     * Inner class to return subscription with plan details
     */
    public static class SubscriptionWithPlan {
        private MemberSubscription subscription;
        private MembershipPlan plan;

        public SubscriptionWithPlan(MemberSubscription subscription, MembershipPlan plan) {
            this.subscription = subscription;
            this.plan = plan;
        }

        public MemberSubscription getSubscription() {
            return subscription;
        }

        public MembershipPlan getPlan() {
            return plan;
        }
    }
}
