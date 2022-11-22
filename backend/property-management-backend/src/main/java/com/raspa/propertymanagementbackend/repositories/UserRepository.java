package com.raspa.propertymanagementbackend.repositories;

import com.raspa.propertymanagementbackend.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long>, JpaSpecificationExecutor<User> {

    List<User> findAllByUsername(String username);
    User findByUsername(String username);

//    @Query(value = "SELECT * FROM user WHERE username = ?1", nativeQuery = true)
    Optional<User> findOneByUsernameIgnoreCase(String username);

//    @Query(value = "SELECT * FROM user WHERE email = ?1", nativeQuery = true)
    Optional<User> findOneByEmailIgnoreCase(String email);

    Optional<User> findOneByPhoneNumber(Long phoneNumber);

    Page<User> findAll(Pageable pageable);

    List<User> findAll();

    Optional<User> findOneWithAuthoritiesByUsername(String login);

    Page<User> findAllByFullNameContaining(Pageable pageable, String fullName);

}
