package com.raspa.propertymanagementbackend.services.mappers;

import com.raspa.propertymanagementbackend.entities.DTOs.LocationDTO;
import com.raspa.propertymanagementbackend.entities.Location;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface LocationMapper {
    LocationMapper INSTANCE= Mappers.getMapper(LocationMapper.class);
     Location convertToEntity(LocationDTO locationDTO);
     @Mapping(target = "properties",ignore = true)
     LocationDTO convertToDto(Location location);
}
