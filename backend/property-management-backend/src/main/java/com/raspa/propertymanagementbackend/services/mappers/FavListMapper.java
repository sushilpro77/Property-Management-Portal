package com.raspa.propertymanagementbackend.services.mappers;


import com.raspa.propertymanagementbackend.entities.DTOs.FavListDTO;
import com.raspa.propertymanagementbackend.entities.FavList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {UserMapper.class, PropertyMapper.class})
public interface FavListMapper {
    FavListMapper INSTANCE = Mappers.getMapper(FavListMapper.class);
    FavList convertToEntity(FavListDTO favListDTO);

    FavListDTO convertToDto(FavList favList);
}
