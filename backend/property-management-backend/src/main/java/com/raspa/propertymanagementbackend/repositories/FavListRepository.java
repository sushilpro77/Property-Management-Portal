package com.raspa.propertymanagementbackend.repositories;


import com.raspa.propertymanagementbackend.entities.FavList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavListRepository extends JpaRepository<FavList, Long> {

}
