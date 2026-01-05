package com.gms.backend.repository;

import com.gms.backend.model.MemberSubscription;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface MemberSubscriptionRepository extends MongoRepository<MemberSubscription, String> {
    List<MemberSubscription> findByUserId(String userId);

    Optional<MemberSubscription> findByStripeSessionId(String stripeSessionId);
}
