package com.raspa.propertymanagementbackend.entities.DTOs;

import com.raspa.propertymanagementbackend.entities.Property;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ManyToOne;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavItemDTO {
    private Long id;
    private PropertyDTO property;
}
