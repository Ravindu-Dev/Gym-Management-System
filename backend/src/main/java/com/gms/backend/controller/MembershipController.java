package com.gms.backend.controller;

import com.gms.backend.model.MembershipPlan;
import com.gms.backend.model.MemberSubscription;
import com.gms.backend.service.MembershipService;
import com.gms.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
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
    public MemberSubscription subscribe(@PathVariable String planId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return membershipService.subscribe(userDetails.getId(), planId);
    }

    @GetMapping("/my-subscriptions")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<MemberSubscription> getMySubscriptions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return membershipService.getUserSubscriptions(userDetails.getId());
    }
}
