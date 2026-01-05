package com.gms.backend.service;

import com.gms.backend.dto.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class StripeService {

        @Value("${stripe.apiKey}")
        private String secretKey;

        @PostConstruct
        public void init() {
                Stripe.apiKey = secretKey;
        }

        public PaymentResponse createCheckoutSession(Long amount, String description, String planId)
                        throws StripeException {
                String successUrl = "http://localhost:5173/payment/success?planId=" + planId
                                + "&session_id={CHECKOUT_SESSION_ID}";
                String cancelUrl = "http://localhost:5173/payment/cancel";

                SessionCreateParams params = SessionCreateParams.builder()
                                .setMode(SessionCreateParams.Mode.PAYMENT)
                                .setSuccessUrl(successUrl)
                                .setCancelUrl(cancelUrl)
                                .addLineItem(
                                                SessionCreateParams.LineItem.builder()
                                                                .setQuantity(1L)
                                                                .setPriceData(
                                                                                SessionCreateParams.LineItem.PriceData
                                                                                                .builder()
                                                                                                .setCurrency("usd")
                                                                                                .setUnitAmount(amount)
                                                                                                .setProductData(
                                                                                                                SessionCreateParams.LineItem.PriceData.ProductData
                                                                                                                                .builder()
                                                                                                                                .setName(description)
                                                                                                                                .build())
                                                                                                .build())
                                                                .build())
                                .build();

                Session session = Session.create(params);
                return new PaymentResponse(session.getUrl(), session.getId());
        }
}
