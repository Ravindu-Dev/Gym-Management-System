package com.gms.backend.controller;

import com.gms.backend.model.MembershipPlan;
import com.gms.backend.model.MemberSubscription;
import com.gms.backend.service.MembershipService;
import com.gms.backend.service.SubscriptionService;
import com.gms.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/membership")
public class MembershipController {
    @Autowired
    MembershipService membershipService;

    @Autowired
    SubscriptionService subscriptionService;

    @GetMapping("/plans")
    public List<MembershipPlan> getAllPlans() {
        return membershipService.getAllPlans();
    }

    @PostMapping("/plans")
    @PreAuthorize("hasRole('ADMIN')")
    public MembershipPlan createPlan(@RequestBody MembershipPlan plan) {
        return membershipService.createPlan(plan);
    }

    @PostMapping("/subscribe/{planId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public MemberSubscription subscribe(@PathVariable String planId, @RequestParam(required = false) String sessionId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return membershipService.subscribe(userDetails.getId(), planId, sessionId);
    }

    @GetMapping("/my-subscriptions")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<MemberSubscription> getMySubscriptions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return membershipService.getUserSubscriptions(userDetails.getId());
    }

    @GetMapping("/my-subscription")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getMySubscription() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return subscriptionService.getActiveSubscriptionWithPlan(userDetails.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok().body(null));
    }
}
