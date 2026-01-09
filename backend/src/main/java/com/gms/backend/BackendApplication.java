package com.gms.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.gms.backend.model.MembershipPlan;
import com.gms.backend.repository.MembershipPlanRepository;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	@Autowired
	MembershipPlanRepository membershipPlanRepository;

	@Autowired
	com.gms.backend.repository.UserRepository userRepository;

	@Autowired
	org.springframework.security.crypto.password.PasswordEncoder encoder;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Initialize default membership plans if none exist
		if (membershipPlanRepository.count() == 0) {
			MembershipPlan basicPlan = new MembershipPlan();
			basicPlan.setName("Basic");
			basicPlan.setDescription("Access to basic gym facilities");
			basicPlan.setPrice(29.99);
			basicPlan.setDurationInMonths(1);
			basicPlan.setFeatures(java.util.Arrays.asList("WORKOUT_TRACKER", "CLASS_SCHEDULE", "ATTENDANCE_QR"));
			membershipPlanRepository.save(basicPlan);

			MembershipPlan premiumPlan = new MembershipPlan();
			premiumPlan.setName("Premium");
			premiumPlan.setDescription("Full access to all gym facilities and classes");
			premiumPlan.setPrice(49.99);
			premiumPlan.setDurationInMonths(1);
			premiumPlan.setFeatures(java.util.Arrays.asList("WORKOUT_TRACKER", "NUTRITION_TRACKER", "BOOK_TRAINER",
					"CLASS_SCHEDULE", "ATTENDANCE_QR"));
			membershipPlanRepository.save(premiumPlan);

			MembershipPlan annualPlan = new MembershipPlan();
			annualPlan.setName("Annual");
			annualPlan.setDescription("Year-long membership with all benefits");
			annualPlan.setPrice(499.99);
			annualPlan.setDurationInMonths(12);
			annualPlan.setFeatures(java.util.Arrays.asList("WORKOUT_TRACKER", "NUTRITION_TRACKER", "BOOK_TRAINER",
					"CLASS_SCHEDULE", "ATTENDANCE_QR"));
			membershipPlanRepository.save(annualPlan);
		}

		if (!userRepository.existsByUsername("admin")) {
			com.gms.backend.model.User admin = new com.gms.backend.model.User();
			admin.setUsername("admin");
			admin.setEmail("admin@gms.com");
			admin.setPassword(encoder.encode("password123"));
			java.util.Set<String> roles = new java.util.HashSet<>();
			roles.add("ROLE_ADMIN");
			roles.add("ROLE_USER");
			admin.setRoles(roles);
			userRepository.save(admin);
			System.out.println("Default admin user created: admin / password123");
		}
	}

}
