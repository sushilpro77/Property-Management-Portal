package com.raspa.propertymanagementbackend.entities.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyDTO {
    private Long id;
    private String title;
    private Boolean isForSell;
    private Boolean isForRent;
    private Integer numberOfRooms;
    private Double price;
    private String propertyType;
    private String homeType;
    private String description;
    private List<ImageDTO> images;
    private UserDTO user;
    private LocationDTO location;
    private List<ApplicationDTO> applications;
}
