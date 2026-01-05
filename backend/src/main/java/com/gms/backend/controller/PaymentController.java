package com.gms.backend.controller;

import com.gms.backend.dto.PaymentRequest;
import com.gms.backend.dto.PaymentResponse;
import com.gms.backend.model.Payment;
import com.gms.backend.repository.PaymentRepository;
import com.gms.backend.service.StripeService;
import com.gms.backend.security.services.UserDetailsImpl;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    StripeService stripeService;

    @Autowired
    PaymentRepository paymentRepository;

    @PostMapping("/create-checkout-session/{planId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createCheckoutSession(@RequestBody PaymentRequest paymentRequest,
            @PathVariable String planId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            PaymentResponse response = stripeService.createCheckoutSession(
                    paymentRequest.getAmount(),
                    paymentRequest.getDescription(),
                    planId);

            // Save pending payment record
            Payment payment = new Payment();
            payment.setUserId(userDetails.getId());
            payment.setPlanId(planId);
            payment.setAmount(paymentRequest.getAmount());
            payment.setStripeSessionId(response.getSessionId());
            payment.setStatus("PENDING");
            payment.setCreatedAt(LocalDateTime.now());
            paymentRepository.save(payment);

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
