package com.gms.backend.service;

import com.gms.backend.model.MembershipPlan;
import com.gms.backend.model.MemberSubscription;
import com.gms.backend.model.User;
import com.gms.backend.model.Payment;
import com.gms.backend.repository.MembershipPlanRepository;
import com.gms.backend.repository.MemberSubscriptionRepository;
import com.gms.backend.repository.PaymentRepository;
import com.gms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MembershipService {
    @Autowired
    MembershipPlanRepository planRepository;

    @Autowired
    MemberSubscriptionRepository subscriptionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PaymentRepository paymentRepository;

    public List<MembershipPlan> getAllPlans() {
        return planRepository.findAll();
    }

    public MembershipPlan createPlan(MembershipPlan plan) {
        return planRepository.save(plan);
    }

    public MemberSubscription subscribe(String userId, String planId, String stripeSessionId) {
        // Idempotency check: if subscription with this session ID already exists,
        // return it
        if (stripeSessionId != null) {
            Optional<MemberSubscription> existing = subscriptionRepository.findByStripeSessionId(stripeSessionId);
            if (existing.isPresent()) {
                return existing.get();
            }
        }

        if (userId == null || planId == null) {
            throw new RuntimeException("User ID or Plan ID cannot be null");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        MembershipPlan plan = planRepository.findById(planId).orElseThrow(() -> new RuntimeException("Plan not found"));

        // Business Logic: Check if user already has an ACTIVE subscription for THIS
        // plan
        // This prevents "Double Plans" even if stripeSessionId is missing or unique
        List<MemberSubscription> userSubs = subscriptionRepository.findByUserId(userId);
        Optional<MemberSubscription> activeSamePlan = userSubs.stream()
                .filter(s -> s.getPlanId().equals(planId) && "ACTIVE".equals(s.getStatus()))
                .findFirst();

        if (activeSamePlan.isPresent()) {
            // If they are already subscribed to this plan, don't create a new one.
            // Just return the existing one.
            MemberSubscription sub = activeSamePlan.get();
            // Optionally update the session ID if it was missing
            if (sub.getStripeSessionId() == null) {
                sub.setStripeSessionId(stripeSessionId);
                subscriptionRepository.save(sub);
            }
            return sub;
        }

        MemberSubscription subscription = new MemberSubscription();
        subscription.setUserId(userId);
        subscription.setPlanId(planId);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusMonths(plan.getDurationInMonths()));
        subscription.setStatus("ACTIVE");
        subscription.setStripeSessionId(stripeSessionId);

        MemberSubscription savedSubscription = subscriptionRepository.save(subscription);

        // Record the physical payment in MongoDB if sessionId is provided
        if (stripeSessionId != null) {
            // Try to find the existing PENDING record first
            Payment payment = paymentRepository.findByStripeSessionId(stripeSessionId)
                    .orElse(new Payment());

            payment.setUserId(userId);
            payment.setPlanId(planId);
            payment.setAmount((long) (plan.getPrice() * 100)); // Convert to cents
            payment.setStripeSessionId(stripeSessionId);
            payment.setStatus("SUCCESS");
            payment.setCreatedAt(LocalDateTime.now());
            paymentRepository.save(payment);
        }

        return savedSubscription;
    }

    public List<MemberSubscription> getUserSubscriptions(String userId) {
        return subscriptionRepository.findByUserId(userId);
    }
}
