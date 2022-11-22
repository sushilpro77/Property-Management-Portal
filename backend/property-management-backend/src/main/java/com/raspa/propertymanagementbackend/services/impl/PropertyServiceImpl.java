package com.raspa.propertymanagementbackend.services.impl;

import com.raspa.propertymanagementbackend.entities.DTOs.PropertyDTO;
import com.raspa.propertymanagementbackend.entities.DTOs.PropertyPerLocationDTO;
import com.raspa.propertymanagementbackend.entities.Image;
import com.raspa.propertymanagementbackend.entities.Location;
import com.raspa.propertymanagementbackend.entities.Property;
import com.raspa.propertymanagementbackend.exceptions.BadRequestAlertException;
import com.raspa.propertymanagementbackend.repositories.ImageRepository;
import com.raspa.propertymanagementbackend.repositories.LocationRepository;
import com.raspa.propertymanagementbackend.repositories.PropertyRepository;
import com.raspa.propertymanagementbackend.services.CloudinaryService;
import com.raspa.propertymanagementbackend.services.PropertyService;
import com.raspa.propertymanagementbackend.services.UserSecurityService;
import com.raspa.propertymanagementbackend.services.mappers.LocationMapper;
import com.raspa.propertymanagementbackend.services.mappers.PropertyMapper;
import com.raspa.propertymanagementbackend.services.specifications.PropertySpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class
PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;
    private final LocationRepository locationRepository;
    private final UserSecurityService userSecurityService;
    private final CloudinaryService cloudinaryService;
    private final ImageRepository imageRepository;

    @Override
    public Page<PropertyDTO> findAll(Pageable pageable, MultiValueMap<String, String> queryParams) {
        Specification specification = Specification.where(null);
        if(queryParams.containsKey("price")) {
            specification = specification.and(PropertySpecification.propertyHasPrice(Double.parseDouble(queryParams.getFirst("price"))));
        }
        if(queryParams.containsKey("propertyType")){
            specification=specification.and(PropertySpecification.propertyHasPropertyType(queryParams.getFirst("propertyType")));
        }
        if(queryParams.containsKey("homeType")){
          specification=specification.and((PropertySpecification.propertyHasHomeType(queryParams.getFirst("homeType"))));
        }
        if(queryParams.containsKey("numberOfRooms")){
            specification=specification.and((PropertySpecification.propertyHasNumbersOfRooms(Integer.parseInt(queryParams.getFirst("numberOfRooms")))));
        }
        if(queryParams.containsKey("location")){
            specification=specification.and((PropertySpecification.propertyHasLocation(queryParams.getFirst("location"))));
        }
        Page<Property> properties = propertyRepository.findAll(specification, pageable);
        return properties.map(propertyMapper::convertToDto);

    }

    @Override
    public PropertyDTO findById(Long id) {
        return propertyMapper.convertToDto(propertyRepository.findById(id).orElseThrow(() ->
                new BadRequestAlertException("Invalid ID!")));
    }

    @Override
    @Transactional
    public PropertyDTO save(PropertyDTO propertyDTO, MultipartFile imageMultipart) throws Exception {
        Property property = propertyMapper.convertToEntity(propertyDTO);
        property.setUser(userSecurityService.getUser());
        property.setLocation(locationRepository.findById(propertyDTO.getLocation().getId()).orElseThrow(() -> new BadRequestAlertException("Invalid Location ID!")));
        property = propertyRepository.save(property);

        String imageUrl = cloudinaryService.upload(imageMultipart, "properties/" + property.getId().toString() + "_" + property.getTitle().replaceAll("\\s", "_"));
        List<Image> images = new ArrayList<>();
        Image image = new Image();
        image.setUrl(imageUrl);
        image.setProperty(property);
        imageRepository.save(image);
        property.setImages(images);

        return propertyMapper.convertToDto(property);
    }

    @Override
    public PropertyDTO update(Long id, PropertyDTO payload, MultipartFile imageMultipart) throws Exception {
        Property property = propertyRepository.findById(id).orElseThrow(() -> new RuntimeException("Invalid ID!"));
        property.setHomeType(payload.getHomeType());
        property.setTitle(payload.getTitle());
        property.setDescription(payload.getDescription());
        property.setPropertyType(payload.getPropertyType());
        property.setIsForRent(payload.getIsForRent());
        property.setIsForSell(payload.getIsForSell());
        if(imageMultipart != null) {
            String imageUrl = cloudinaryService.upload(imageMultipart, "properties/" + property.getId().toString() + "_" + property.getTitle().replaceAll("\\s", "_"));
            List<Image> images = new ArrayList<>();
            Image image = new Image();
            image.setUrl(imageUrl);
            image.setProperty(property);
            imageRepository.save(image);
            property.setImages(images);
        }

        property.setLocation(locationRepository.findById(payload.getLocation().getId()).orElseThrow(() -> new BadRequestAlertException("Invalid Location ID!")));
        property.setNumberOfRooms(payload.getNumberOfRooms());
        property.setPrice(payload.getPrice());

        return propertyMapper.convertToDto(propertyRepository.save(property));
    }

    @Override
    public PropertyDTO delete(Long id) {
        Property property = propertyRepository.findById(id).orElseThrow(() -> new RuntimeException("Invalid ID!"));
        propertyRepository.delete(property);
        return propertyMapper.convertToDto(property);
    }

    @Override
    public List<PropertyPerLocationDTO> findPropertiesByLocationStats() {
        List<Location> locations = locationRepository.findAll();
        List<PropertyPerLocationDTO> propertyPerLocationDTOS = new ArrayList<>();
        for(Location location: locations)
            propertyPerLocationDTOS.add(new PropertyPerLocationDTO(location.getName(), location.getProperties().size()));
        return propertyPerLocationDTOS;
    }
}