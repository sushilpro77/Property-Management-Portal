package com.raspa.propertymanagementbackend.services.mappers;

import com.raspa.propertymanagementbackend.entities.DTOs.RoleDTO;
import com.raspa.propertymanagementbackend.entities.DTOs.UserDTO;
import com.raspa.propertymanagementbackend.entities.User;
import com.raspa.propertymanagementbackend.entities.security.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);

    Role convertToEntity(RoleDTO roleDTO);

    RoleDTO convertToDto(Role role);

}
