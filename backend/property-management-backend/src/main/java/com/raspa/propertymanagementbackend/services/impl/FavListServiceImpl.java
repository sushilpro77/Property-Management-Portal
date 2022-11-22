package com.raspa.propertymanagementbackend.services.impl;

import com.raspa.propertymanagementbackend.entities.DTOs.FavItemDTO;
import com.raspa.propertymanagementbackend.entities.DTOs.FavListDTO;
import com.raspa.propertymanagementbackend.entities.FavItem;
import com.raspa.propertymanagementbackend.entities.FavList;
import com.raspa.propertymanagementbackend.entities.Property;
import com.raspa.propertymanagementbackend.entities.User;
import com.raspa.propertymanagementbackend.exceptions.BadRequestAlertException;
import com.raspa.propertymanagementbackend.repositories.FavItemRepository;
import com.raspa.propertymanagementbackend.repositories.FavListRepository;
import com.raspa.propertymanagementbackend.repositories.PropertyRepository;
import com.raspa.propertymanagementbackend.services.FavListService;
import com.raspa.propertymanagementbackend.services.UserSecurityService;
import com.raspa.propertymanagementbackend.services.mappers.FavItemMapper;
import com.raspa.propertymanagementbackend.services.mappers.FavListMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class FavListServiceImpl implements FavListService {

    private final FavListRepository favListRepository;

    private final FavItemRepository favItemRepository;
    private final PropertyRepository propertyRepository;
    private final FavListMapper favListMapper;
    private final FavItemMapper favItemMapper;
    private final UserSecurityService userSecurityService;
    private final UserSecurityService userDetailsService;
    @Override
    public List<FavListDTO> getAll() {
//        List<FavList> favLists = favListRepository.findAll();
        List<FavList> favLists = userSecurityService.getCurrentUser().get().getFavLists();
        return favLists.stream().map(favListMapper::convertToDto).collect(Collectors.toList());
    }

    @Override
    public FavListDTO create(FavListDTO favListDTO) {
        FavList favList = favListMapper.convertToEntity(favListDTO);
        FavList save = favListRepository.save(favList);
        User user = userSecurityService.getCurrentUser().orElseThrow(() -> new BadRequestAlertException("Not Logged IN!"));
        user.getFavLists().add(save);
        return favListMapper.convertToDto(save);
    }

    @Override
    public FavListDTO update(Long id, FavListDTO favListDTO) {
        if(!id.equals(favListDTO.getId())) throw new RuntimeException("ID not current");
        FavList favList = favListRepository.findById(id).orElseThrow(() -> new RuntimeException(" Data Not found"));
        favList.setName(favListDTO.getName());
        return favListMapper.convertToDto(favListRepository.save(favList));
    }

    @Override
    public FavItemDTO updateItem(Long id, FavItemDTO favItemDTO) {
        FavList favList = favListRepository.findById(id).orElseThrow(() -> new RuntimeException(" Fav List Not found"));
        List<FavItem> favItems = favList.getFavItems();
        Long propId = favItemDTO.getProperty().getId();
        Property property = propertyRepository.findById(propId).orElseThrow(() -> new RuntimeException(" Property Not Found"));
        FavItem favItem = new FavItem();
        favItem.setProperty(property);
        favItems.add(favItem);
        favItemRepository.save(favItem);
        propertyRepository.save(property);
        return favItemDTO;
//        favItems.add(); // how to add favitem here because in favitemdto product is there.
    }

    @Override
    public FavListDTO delete(Long id) {
        FavList favList = favListRepository.findById(id).orElseThrow(() -> new RuntimeException(" Data Not found"));
        favListRepository.deleteById(id);
        return favListMapper.convertToDto(favList);
    }

    @Override
    public FavItemDTO deleteItem(Long id) {
        FavItem favItem = favItemRepository.findById(id).orElseThrow(() -> new RuntimeException(" Fav Item Not found"));
        favItemRepository.deleteById(id);
        return favItemMapper.convertToDto(favItem);
    }
}
