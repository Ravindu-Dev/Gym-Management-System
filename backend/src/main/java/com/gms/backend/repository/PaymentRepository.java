package com.gms.backend.repository;

import com.gms.backend.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    Optional<Payment> findByStripeSessionId(String stripeSessionId);
}
