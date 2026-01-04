package com.gms.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStats {
    private long totalMembers;
    private double totalRevenue;
    private long totalEquipment;
    private long totalClasses;
}
