package com.raspa.propertymanagementbackend.services.mappers;

import com.raspa.propertymanagementbackend.entities.DTOs.UserDTO;
import com.raspa.propertymanagementbackend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {RoleMapper.class})
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User convertToEntity(UserDTO userDTO);

    @Mapping(target = "properties", ignore = true)
    @Mapping(target = "applications", ignore = true)
    UserDTO convertToDto(User user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "properties", ignore = true)
    @Mapping(target = "applications", ignore = true)
    @Named("convertToDtoUser")
    UserDTO convertToDtoUser(User user);

    @Mapping(target = "username", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "phoneNumber", ignore = true)
    @Named("convertToDtoPublic")
    UserDTO convertToDtoPublic(User user);
}
