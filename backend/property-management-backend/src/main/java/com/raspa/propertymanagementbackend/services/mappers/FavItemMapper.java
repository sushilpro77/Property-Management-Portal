package com.raspa.propertymanagementbackend.services.mappers;


import com.raspa.propertymanagementbackend.entities.DTOs.FavItemDTO;
import com.raspa.propertymanagementbackend.entities.DTOs.LocationDTO;
import com.raspa.propertymanagementbackend.entities.FavItem;
import com.raspa.propertymanagementbackend.entities.Location;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {UserMapper.class, PropertyMapper.class})
public interface FavItemMapper {
    FavItemMapper INSTANCE = Mappers.getMapper(FavItemMapper.class);

    FavItem convertToEntity(FavItemDTO favItemDTO);

    FavItemDTO convertToDto(FavItem favItem);
}
