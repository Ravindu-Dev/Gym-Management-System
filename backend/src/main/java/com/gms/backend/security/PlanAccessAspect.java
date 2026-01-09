package com.gms.backend.security;

import com.gms.backend.service.SubscriptionService;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

/**
 * AOP Aspect to enforce plan-based access control
 */
@Aspect
@Component
public class PlanAccessAspect {

    @Autowired
    SubscriptionService subscriptionService;

    @Before("@annotation(requiresPlan)")
    public void checkPlanAccess(RequiresPlan requiresPlan) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        String userId = authentication.getName(); // This gets the username, need to get user ID

        // Get user ID from authentication principal
        Object principal = authentication.getPrincipal();
        if (principal instanceof com.gms.backend.security.services.UserDetailsImpl) {
            userId = ((com.gms.backend.security.services.UserDetailsImpl) principal).getId();
        }

        String requiredFeature = requiresPlan.feature();
        boolean hasAccess = subscriptionService.hasFeatureAccess(userId, requiredFeature);

        if (!hasAccess) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "This feature requires an active subscription with " + requiredFeature + " access");
        }
    }
}
