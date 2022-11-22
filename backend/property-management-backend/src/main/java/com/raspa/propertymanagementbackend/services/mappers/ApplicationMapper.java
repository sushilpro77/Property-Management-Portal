package com.raspa.propertymanagementbackend.services.mappers;

import com.raspa.propertymanagementbackend.entities.Application;
import com.raspa.propertymanagementbackend.entities.DTOs.ApplicationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring", uses = {PropertyMapper.class, UserMapper.class})
public interface ApplicationMapper {
    ApplicationMapper INSTANCE= Mappers.getMapper(ApplicationMapper.class);
    Application convertToEntity(ApplicationDTO applicationDTO);
    ApplicationDTO convertToDto(Application application);
}
