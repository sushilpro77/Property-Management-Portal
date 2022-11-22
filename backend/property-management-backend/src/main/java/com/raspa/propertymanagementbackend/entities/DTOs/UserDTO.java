package com.raspa.propertymanagementbackend.entities.DTOs;

import com.raspa.propertymanagementbackend.entities.Image;
import com.raspa.propertymanagementbackend.entities.Location;
import com.raspa.propertymanagementbackend.entities.security.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String fullName;
    private String email;
    private Long phoneNumber;
    private String imageUrl;
    private boolean enabled;
    private List<PropertyDTO> properties;
    private List<FavListDTO> favListDTOS;
    private Set<Role> roles;
    private List<ApplicationDTO> applications;

}
