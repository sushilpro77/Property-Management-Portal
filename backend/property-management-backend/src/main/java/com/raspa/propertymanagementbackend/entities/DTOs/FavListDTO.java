package com.raspa.propertymanagementbackend.entities.DTOs;

import com.raspa.propertymanagementbackend.entities.FavItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavListDTO {
    private Long id;
    private String name;
    private List<FavItemDTO> favItems;
}
