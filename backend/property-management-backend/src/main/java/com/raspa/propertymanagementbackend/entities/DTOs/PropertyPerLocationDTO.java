package com.raspa.propertymanagementbackend.entities.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyPerLocationDTO {
    private String name;
    private Integer value;
}
