package com.raspa.propertymanagementbackend.entities.DTOs;

import com.raspa.propertymanagementbackend.entities.Property;
import lombok.Data;

import javax.persistence.ManyToOne;
@Data
public class ImageDTO {
    private Integer id;
    private String url;
    private PropertyDTO property;
}
