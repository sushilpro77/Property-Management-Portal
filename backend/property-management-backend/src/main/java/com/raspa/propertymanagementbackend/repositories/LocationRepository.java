package com.raspa.propertymanagementbackend.repositories;

import com.raspa.propertymanagementbackend.entities.Location;
import com.raspa.propertymanagementbackend.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {


}
