package com.gms.backend.controller;

import com.gms.backend.dto.PaymentRequest;
import com.gms.backend.dto.PaymentResponse;
import com.gms.backend.service.StripeService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    StripeService stripeService;

    @PostMapping("/create-checkout-session/{planId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createCheckoutSession(@RequestBody PaymentRequest paymentRequest,
            @PathVariable String planId) {
        try {
            PaymentResponse response = stripeService.createCheckoutSession(
                    paymentRequest.getAmount(),
                    paymentRequest.getDescription(),
                    planId);
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
