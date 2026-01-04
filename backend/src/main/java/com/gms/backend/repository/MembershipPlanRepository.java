package com.gms.backend.repository;

import com.gms.backend.model.MembershipPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MembershipPlanRepository extends MongoRepository<MembershipPlan, String> {
}
