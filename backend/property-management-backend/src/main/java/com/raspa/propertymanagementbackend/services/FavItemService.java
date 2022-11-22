package com.raspa.propertymanagementbackend.services;

import com.raspa.propertymanagementbackend.entities.DTOs.FavItemDTO;

import java.util.List;

public interface FavItemService {

    List<FavItemDTO> getAll();

    FavItemDTO create(FavItemDTO favItemDTO);

    FavItemDTO update(Long id, FavItemDTO favItemDTO);

    FavItemDTO delete(Long id);


}
