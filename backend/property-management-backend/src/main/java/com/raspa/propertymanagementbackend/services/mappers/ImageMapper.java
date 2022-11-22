package com.raspa.propertymanagementbackend.services.mappers;


import com.raspa.propertymanagementbackend.entities.DTOs.ImageDTO;
import com.raspa.propertymanagementbackend.entities.DTOs.LocationDTO;
import com.raspa.propertymanagementbackend.entities.Image;
import com.raspa.propertymanagementbackend.entities.Location;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {})
public interface ImageMapper {
    ImageMapper INSTANCE=Mappers.getMapper(ImageMapper.class);
    Image convertToEntity(ImageDTO imageDTO);
    @Mapping(target ="property",ignore = true )
    ImageDTO convertToDto(Image image);

//    Location convertToEntity(LocationDTO locationDTO);
//    @Mapping(target = "properties",ignore = true)
//    LocationDTO convertToDto(Location location);
}
