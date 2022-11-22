package com.raspa.propertymanagementbackend.entities.DTOs;

import com.raspa.propertymanagementbackend.entities.Property;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.OneToMany;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationDTO {
    private Long id;
    private String name;
    private List<PropertyDTO> properties;
}
