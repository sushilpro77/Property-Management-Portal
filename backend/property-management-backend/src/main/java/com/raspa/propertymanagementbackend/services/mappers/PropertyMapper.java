package com.raspa.propertymanagementbackend.services.mappers;

import com.raspa.propertymanagementbackend.entities.DTOs.PropertyDTO;
import com.raspa.propertymanagementbackend.entities.Property;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {UserMapper.class, LocationMapper.class, ImageMapper.class})
public interface PropertyMapper {
    PropertyMapper INSTANCE= Mappers.getMapper(PropertyMapper.class);

    Property convertToEntity(PropertyDTO propertyDTO);

    @Mapping(target = "user",ignore = true)
    @Mapping(target = "applications",ignore = true)
    PropertyDTO convertToDto(Property property);

}
