package com.raspa.propertymanagementbackend.services;

import com.raspa.propertymanagementbackend.entities.DTOs.ApplicationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

@Service

public interface ApplicationService {
    ApplicationDTO save(ApplicationDTO applicationDTO);

    ApplicationDTO findById(Long id);

    Page<ApplicationDTO> findAll(Pageable pageable, MultiValueMap<String, String> queryParams);

    ApplicationDTO update(Long id, ApplicationDTO payload);

    ApplicationDTO delete(Long id);
}
