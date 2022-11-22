package com.raspa.propertymanagementbackend.services.impl;

import com.raspa.propertymanagementbackend.entities.Application;
import com.raspa.propertymanagementbackend.entities.DTOs.ApplicationDTO;
import com.raspa.propertymanagementbackend.entities.Property;
import com.raspa.propertymanagementbackend.entities.User;
import com.raspa.propertymanagementbackend.entities.security.Role;
import com.raspa.propertymanagementbackend.exceptions.BadRequestAlertException;
import com.raspa.propertymanagementbackend.repositories.ApplicationRepository;
import com.raspa.propertymanagementbackend.repositories.PropertyRepository;
import com.raspa.propertymanagementbackend.services.ApplicationService;
import com.raspa.propertymanagementbackend.services.PropertyService;
import com.raspa.propertymanagementbackend.services.UserSecurityService;
import com.raspa.propertymanagementbackend.services.mappers.ApplicationMapper;
import com.raspa.propertymanagementbackend.services.specifications.ApplicationSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import javax.transaction.Transactional;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;
    private final MailServiceImpl mailService;
    private final UserSecurityService userSecurityService;
    private final PropertyRepository propertyRepository;

    @Override
    @Transactional
    public ApplicationDTO save(ApplicationDTO applicationDTO){
        User user = userSecurityService.getUser();

        Application application = new Application();
        application.setIsForRent(applicationDTO.getIsForRent());
        application.setIsForSell(applicationDTO.getIsForSell());
        application.setUser(user);
        Property property = propertyRepository.findById(applicationDTO.getProperty().getId()).orElseThrow(() -> new BadRequestAlertException("Invalid Property ID!"));
        application.setSubmissionDate(LocalDate.now());
        application.setProperty(property);
        applicationRepository.save(application);

        mailService.sendMessage(property.getUser().getEmail(), application.getProperty().getTitle());
        return applicationMapper.convertToDto(applicationRepository.save(application));
    }
    @Override
    public ApplicationDTO findById(Long id){
        return applicationMapper.convertToDto(applicationRepository.findById(id).orElseThrow(() ->
                new BadRequestAlertException("Invalid ID!")));
    }
    @Override
    public Page<ApplicationDTO> findAll(Pageable pageable, MultiValueMap<String, String> queryParams){
        Specification specification = Specification.where(null);

        User user = userSecurityService.getUser();
        Boolean isAdmin = user.getRoles().stream()
                .filter(r -> r.getRole_name().equals("ADMIN")).count() > 0 ? true : false;

        if(!isAdmin) specification = specification.and(ApplicationSpecification.applicationHasUser(user));

        if(queryParams.containsKey("propertyId")) {
            specification = specification.and(ApplicationSpecification.applicationHasPropertyId(Long.parseLong(queryParams.getFirst("propertyId"))));
        }
        if(queryParams.containsKey("submissionDate")){
            specification=specification.and(ApplicationSpecification.applicationHasSubmissionDate(LocalDate.parse(queryParams.getFirst("submissionDate"))));
        }
        if(queryParams.containsKey("locationId")){
            specification=specification.and((ApplicationSpecification.applicationHasLocationId(queryParams.getFirst("locationId"))));
        }

        Page<Application> applications = applicationRepository.findAll(specification, pageable);
        return applications.map(applicationMapper::convertToDto);
    }
    @Override
    public ApplicationDTO update(Long id, ApplicationDTO payload ){
        Application application = applicationRepository.findById(id).orElseThrow(() -> new RuntimeException("Invalid ID !"));
        application.setIsForSell(payload.getIsForSell());
        application.setIsForRent(payload.getIsForRent());
        return applicationMapper.convertToDto(applicationRepository.save(application));
    }
    @Override
    public ApplicationDTO delete(Long id){
        Application application = applicationRepository.findById(id).orElseThrow(() -> new RuntimeException("Invalid ID !"));
        applicationRepository.delete(application);
        return applicationMapper.convertToDto(application);
    }

}
