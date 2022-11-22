package com.raspa.propertymanagementbackend.services.impl;

import com.raspa.propertymanagementbackend.entities.DTOs.FavItemDTO;
import com.raspa.propertymanagementbackend.entities.FavItem;
import com.raspa.propertymanagementbackend.repositories.FavItemRepository;
import com.raspa.propertymanagementbackend.services.FavItemService;
import com.raspa.propertymanagementbackend.services.mappers.FavItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavItemServiceImpl implements FavItemService {

    private final FavItemRepository favItemRepository;
    private final FavItemMapper favItemMapper;

    @Override
    public List<FavItemDTO> getAll() {
        List<FavItem> favItems = favItemRepository.findAll();
        return favItems.stream().map(favItemMapper::convertToDto).collect(Collectors.toList());
    }

    @Override
    public FavItemDTO create(FavItemDTO favItemDTO) {
        return favItemMapper.convertToDto( favItemRepository.save(favItemMapper.convertToEntity(favItemDTO)));
    }

    @Override
    public FavItemDTO update(Long id, FavItemDTO favItemDTO) {
        FavItem favItem = favItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Invalid Fav Id!"));
        if(id != favItemDTO.getId()) throw new RuntimeException("ID is different");
        return favItemMapper.convertToDto( favItemRepository.save(favItemMapper.convertToEntity(favItemDTO)));

    }

    @Override
    public FavItemDTO delete(Long id) {
        FavItem favItem = favItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Invalid Fav Id!"));
        favItemRepository.deleteById(id);
        return favItemMapper.convertToDto(favItem);
    }
}
