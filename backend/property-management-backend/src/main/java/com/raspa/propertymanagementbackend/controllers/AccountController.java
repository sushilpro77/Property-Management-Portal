package com.raspa.propertymanagementbackend.controllers;

import com.raspa.propertymanagementbackend.Utils.AuthoritiesConstants;
import com.raspa.propertymanagementbackend.entities.DTOs.UserDTO;
import com.raspa.propertymanagementbackend.exceptions.BadRequestAlertException;
import com.raspa.propertymanagementbackend.exceptions.InvalidPasswordException;
import com.raspa.propertymanagementbackend.services.UserSecurityService;
import com.raspa.propertymanagementbackend.services.mappers.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/api/users")
public class AccountController {

    @Autowired
    UserSecurityService userSecurityService;

    @Autowired
    UserMapper userMapper;

    Logger logger = LoggerFactory.getLogger(AccountController.class);

    @PostMapping(value = "/register")
    public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody UserDTO userDTO){
        if(userDTO.getId() != null) throw new BadRequestAlertException("User contains ID");
        if(!checkForPasswordLength(userDTO.getPassword())){
            throw new InvalidPasswordException("Password Invalid");
        }

        List<Long> rolesToBeAdded = new ArrayList<>();
        rolesToBeAdded.add(AuthoritiesConstants.CUSTOMER);
        UserDTO createdUserDTO = userSecurityService.registerUser(userDTO, rolesToBeAdded);

        return ResponseEntity.ok().body(createdUserDTO);

    }

    public boolean checkForPasswordLength(String password){
        if(password == null || password.length() < 4 || password.length() > 100){
            return false;
        }
        return true;
    }

    @GetMapping("/register/validUsername/{username}")
    public ResponseEntity<Boolean> checkUsernameUsed(@PathVariable String username){
        return ResponseEntity.ok().body(userSecurityService.checkUsernameUsed(username.toLowerCase()));
    }

    @GetMapping("/register/validEmail/{email}")
    public ResponseEntity<Boolean> checkEmailUsed(@PathVariable String email){
        return ResponseEntity.ok().body(userSecurityService.checkEmailUsed(email.toLowerCase()));
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserDTO>> findAllUsers(@RequestParam MultiValueMap<String, String> queryParams){
        return ResponseEntity.ok().body(userSecurityService.getUsers(queryParams));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findUser(@PathVariable Long id){
        return ResponseEntity.ok().body(userSecurityService.getUser(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}/edit")
    public ResponseEntity<UserDTO> edit(@PathVariable Long id, @RequestBody UserDTO userDTO){
        if(id != userDTO.getId()) throw new BadRequestAlertException("Invalid ID!");
        return ResponseEntity.ok().body(userSecurityService.editUsers(userDTO));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}/passwordReset")
    public ResponseEntity<UserDTO> passwordReset(@PathVariable Long id, @RequestBody UserDTO userDTO){
        if(id != userDTO.getId()) throw new BadRequestAlertException("Invalid ID!");
        return ResponseEntity.ok().body(userSecurityService.resetPassword(userDTO));
    }

    @GetMapping("/register/validPhoneNumber/{phoneNumber}")
    public ResponseEntity<Boolean> checkEmailUsed(@PathVariable Long phoneNumber){
        return ResponseEntity.ok().body(userSecurityService.checkPhoneNumberUsed(phoneNumber));
    }

    @GetMapping("/account")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('OWNER') or hasRole('ADMIN')")
    public UserDTO getAccountDetails(@RequestHeader HttpHeaders headers){
        return userSecurityService.getCurrentUser().map(userMapper::convertToDtoUser)
        .orElseThrow(() -> new BadRequestAlertException("No Such User Exists"));
    }

    @PostMapping("/changePassword")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('OWNER') or hasRole('ADMIN')")
    public void changePassword(@RequestBody HashMap<String, String> payload){
        userSecurityService.changePassword(payload.get("oldPassword"), payload.get("newPassword"));
    }

    @PostMapping("/uploadProfileImage")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('OWNER') or hasRole('ADMIN')")
    public String uploadProfileImage(String imageUrl){
        return userSecurityService.updateProfileImage(imageUrl);
    }

//    @PreAuthorize("hasRole('USER')")
//    @PostMapping("/users/reset-password/init")
//    public ResponseEntity<Long> requestResetPassword(@RequestBody HashMap<String, String> payload){
//        Long userId = userSecurityService.requestPasswordReset(payload.get("email"));
//        return ResponseEntity.ok().body(userId);
//    }

//    @PreAuthorize("hasRole('USER')")
//    @PostMapping("/reset-password/finish")
//    public ResponseEntity resetForgotPassword(@RequestBody HashMap<String, String> payload){
//        Long userId = Long.parseLong(payload.get("id"));
//        String resetKey = payload.get("resetKey");
//        String newPassword = payload.get("newPassword");
//        if(userId == null || resetKey == null || newPassword == null || !checkForPasswordLength(newPassword)) throw new BadRequestAlertException("Invalid Request");
//        userSecurityService.changeTheResetPassword(userId, resetKey, newPassword);
//
//        return ResponseEntity.ok().body(null);
//    }

    @PutMapping("/account")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('OWNER') or hasRole('ADMIN')")
    public UserDTO updateAccountDetails(@Valid @RequestBody UserDTO payload) {
        UserDTO userDTO = userSecurityService.updateUserDetails(payload);
        return userDTO;
    }
}
