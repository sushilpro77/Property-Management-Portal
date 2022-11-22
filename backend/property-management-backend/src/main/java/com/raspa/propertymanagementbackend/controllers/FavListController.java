package com.raspa.propertymanagementbackend.controllers;

import com.raspa.propertymanagementbackend.entities.DTOs.FavItemDTO;
import com.raspa.propertymanagementbackend.entities.DTOs.FavListDTO;
import com.raspa.propertymanagementbackend.services.FavListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/fav-lists")
@RequiredArgsConstructor
public class FavListController {

    private final FavListService favListService;

    //get
    @GetMapping
    public List<FavListDTO> getAll(){
        return favListService.getAll();
    }

    //post
    @PostMapping()
    public FavListDTO create(@RequestBody FavListDTO favListDTO){
        return favListService.create(favListDTO);
    }


    //update
    @PutMapping("/{id}")
    public FavListDTO update(@PathVariable Long id, @RequestBody FavListDTO favListDTO){
        return favListService.update(id, favListDTO);
    }

    @PutMapping("/item/{id}")
    public FavItemDTO updateItem(@PathVariable Long id, @RequestBody FavItemDTO favItemDTO){
        return favListService.updateItem(id, favItemDTO);
    }


    //delete
    @DeleteMapping("/{id}")
    public FavListDTO delete(@PathVariable Long id){
        return favListService.delete(id);
    }


    @DeleteMapping("/item/{id}")
    public FavItemDTO deleteItem(@PathVariable Long id){
        return favListService.deleteItem(id);
    }


}
