package com.raspa.propertymanagementbackend.services;

import com.raspa.propertymanagementbackend.entities.DTOs.FavItemDTO;
import com.raspa.propertymanagementbackend.entities.DTOs.FavListDTO;

import java.util.List;

public interface FavListService {

    List<FavListDTO> getAll();
    FavListDTO create(FavListDTO favListDTO);
    FavListDTO update(Long id, FavListDTO favListDTO);

    FavItemDTO updateItem(Long id, FavItemDTO favItemDTO);
    FavListDTO delete(Long id);

    FavItemDTO deleteItem(Long id);
}
