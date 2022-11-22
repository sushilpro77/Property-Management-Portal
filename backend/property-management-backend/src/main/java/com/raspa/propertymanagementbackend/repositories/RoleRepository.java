package com.raspa.propertymanagementbackend.repositories;

import com.raspa.propertymanagementbackend.entities.User;
import com.raspa.propertymanagementbackend.entities.security.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface RoleRepository extends CrudRepository<Role, Long>{

    Set<Role> findByUsers(User user);
}
