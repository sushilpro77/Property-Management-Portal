package com.raspa.propertymanagementbackend.entities.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationDTO {
    private Long id;

    private Boolean isForRent;
    private Boolean isForSell;
    private UserDTO user;
    private PropertyDTO property;
    private String submissionDate;

}
