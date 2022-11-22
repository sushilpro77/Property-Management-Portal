package com.raspa.propertymanagementbackend.services;

import com.raspa.propertymanagementbackend.entities.DTOs.PropertyDTO;
import com.raspa.propertymanagementbackend.entities.DTOs.PropertyPerLocationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface PropertyService {


    Page<PropertyDTO> findAll(Pageable pageable, MultiValueMap<String, String> queryParams);

    PropertyDTO findById(Long id);

    PropertyDTO save(PropertyDTO propertyDTO, MultipartFile image) throws Exception;

    PropertyDTO update(Long id, PropertyDTO property, MultipartFile image) throws Exception;

    PropertyDTO delete(Long id);

    List<PropertyPerLocationDTO> findPropertiesByLocationStats();
}
