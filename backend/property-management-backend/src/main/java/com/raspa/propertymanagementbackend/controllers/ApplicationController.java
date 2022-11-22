package com.raspa.propertymanagementbackend.controllers;

import com.raspa.propertymanagementbackend.entities.DTOs.ApplicationDTO;
import com.raspa.propertymanagementbackend.services.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/applications")
@RequiredArgsConstructor
public class ApplicationController {
    private final ApplicationService applicationService;

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_OWNER')")
    @GetMapping
    public Page<ApplicationDTO> findAll(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams){
        return applicationService.findAll(pageable, queryParams);
    }

    @GetMapping("/{id}")
    public ApplicationDTO findById(@PathVariable Long id){
        return applicationService.findById(id);
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping
    public ApplicationDTO save(@RequestBody ApplicationDTO applicationDTO){
        return applicationService.save(applicationDTO);

    }
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PutMapping("/{id}")
    public ApplicationDTO update(@PathVariable Long id, @RequestBody ApplicationDTO payload){
        return applicationService.update(id,payload);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ApplicationDTO delete(@PathVariable Long id){
        return applicationService.delete(id);
    }

 //    Owners can display all applications and filter them
//    by property,
//    by submission date,
//    by location.










}
