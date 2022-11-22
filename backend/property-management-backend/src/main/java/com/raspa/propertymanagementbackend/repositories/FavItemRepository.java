package com.raspa.propertymanagementbackend.repositories;

import com.raspa.propertymanagementbackend.entities.FavItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavItemRepository extends JpaRepository<FavItem, Long> {

}
