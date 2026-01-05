package com.gms.backend.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long amount; // in cents
    private String description;
}
