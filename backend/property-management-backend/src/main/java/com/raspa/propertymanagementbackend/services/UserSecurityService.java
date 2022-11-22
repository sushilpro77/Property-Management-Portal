package com.raspa.propertymanagementbackend.services;

import com.raspa.propertymanagementbackend.Utils.MailConstructor;
import com.raspa.propertymanagementbackend.Utils.RandomUtil;
import com.raspa.propertymanagementbackend.entities.DTOs.UserDTO;
import com.raspa.propertymanagementbackend.entities.User;
import com.raspa.propertymanagementbackend.entities.security.Role;
import com.raspa.propertymanagementbackend.exceptions.BadRequestAlertException;
import com.raspa.propertymanagementbackend.exceptions.EmailAlreadyUsedException;
import com.raspa.propertymanagementbackend.exceptions.UsernameAlreadyUsedException;
import com.raspa.propertymanagementbackend.repositories.RoleRepository;
import com.raspa.propertymanagementbackend.repositories.UserRepository;
import com.raspa.propertymanagementbackend.security.jwt.SecurityUtils;
import com.raspa.propertymanagementbackend.services.mappers.UserMapper;
import com.raspa.propertymanagementbackend.services.specifications.UserSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserSecurityService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserSecurityService.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    MailConstructor mailConstructor;

    @Autowired
    CloudinaryService cloudinaryService;

    public User getUser(){
        Optional<User> userOpt = SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByUsername);
        if(!userOpt.isPresent()) throw new BadRequestAlertException("No Such User!");
        return userOpt.get();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            Optional<User> userOpt = userRepository.findOneByEmailIgnoreCase(username);
            if (userOpt.isPresent()) user = userOpt.get();
        }
        if(user == null){
            logger.warn("Username {} not found", username);
            throw new UsernameNotFoundException("Username " + username + " not found");
        }
        return user;
    }

    @Transactional
    public UserDTO registerUser(UserDTO userDTO, List<Long> rolesToBeAdded) {
        usernameOrEmailOrPhoneNumberExists(userDTO.getUsername().toLowerCase(), userDTO.getEmail().toLowerCase(), userDTO.getPhoneNumber());
        User user = userMapper.convertToEntity(userDTO);
        //TODO BCrypt Encryption on Password
        user.setPassword(userDTO.getPassword());

        user.setActivationKey(RandomUtil.generateRandomActivationCode());
        Set<Role> roles = new HashSet<>();

        rolesToBeAdded.forEach(r -> roleRepository.findById(r).ifPresent(roles::add));
        user.setRoles(roles);

        user.setEnabled(true);
        user = userRepository.save(user);

//        Activation Token is supposed to be sent here
//        mailConstructor.sendRegistrationSuccessEmail(userDTO);

        return userMapper.convertToDtoUser(user);

    }

    public Boolean checkUsernameUsed(String username){
        Optional<User> user = userRepository.findOneByUsernameIgnoreCase(username);
        return user.isPresent();
    }

    public Boolean checkEmailUsed(String email){
        Optional<User> user = userRepository.findOneByEmailIgnoreCase(email);
        return user.isPresent();
    }

    public boolean usernameOrEmailOrPhoneNumberExists(String username, String email, Long phoneNumber){
        if(userRepository.findOneByUsernameIgnoreCase(username).isPresent()){
            throw new UsernameAlreadyUsedException();
        }
        if(userRepository.findOneByEmailIgnoreCase(email).isPresent()){
            throw new EmailAlreadyUsedException();
        }
        if(userRepository.findOneByPhoneNumber(phoneNumber).isPresent()){
            throw new BadRequestAlertException("Phone Number Already Used!");
        }
        return true;
    }

    public Long requestPasswordReset(String email) {
        Optional<User> userOpt = userRepository.findOneByEmailIgnoreCase(email);
        if(userOpt.isPresent()) {
            User user = userOpt.get();
            user.setResetDate(Instant.now());

            Random random = new Random();
            String resetKey = String.format("%06d", random.nextInt(1000000));
            user.setResetKey(resetKey);

            userRepository.save(user);

            mailConstructor.sendPasswordResetMail(user);
            return user.getId();
        }
        return -1L;
    }

    public void changePassword(String oldPassword, String newPassword){
        Optional<User> userOpt = SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByUsername);
        if(!userOpt.isPresent()) throw new BadRequestAlertException("No Such User!");
        User user = userOpt.get();
        //TODO BCrypt Password Encoding
        if(!user.getPassword().equals(oldPassword)) throw new BadRequestAlertException("Password Incorrect");

        user.setPassword(newPassword);
        userRepository.save(user);
    }

    public void changeTheResetPassword(Long id, String key, String newPassword) {
        Optional<User> userOpt = userRepository.findById(id);
        if(!userOpt.isPresent()) throw new BadRequestAlertException("Invalid Request");

        User user = userOpt.get();
        if(!key.equals(user.getResetKey()) || !user.getResetDate().isAfter(Instant.now().minusSeconds(86400))) throw new BadRequestAlertException("Bad Request");

        user.setResetKey(null);
        user.setResetDate(null);
        //TODO BCrypt Encryption
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    public Optional<User> getCurrentUser() {
        return SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByUsername);
    }

    public UserDTO updateUserDetails(UserDTO payload){
        Optional<User> userOpt = SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByUsername);
        if(!userOpt.isPresent()) throw new BadRequestAlertException("No Such User Found");

        User user = userOpt.get();
        user.setFullName(payload.getFullName());
        if(payload.getImageUrl() != null || !payload.getImageUrl().equals(""))
            user.setImageUrl(payload.getImageUrl());
        user = userRepository.save(user);
        return userMapper.convertToDto(user);
    }

    public Page<UserDTO> getAllUsers(Pageable pageable, MultiValueMap<String, String> queryParams) {
        Specification<User> specification = Specification.where(null);
        if(queryParams.containsKey("username")){
            specification = specification.and(UserSpecification.userHasUsername(queryParams.get("username").get(0)));
        }

        return userRepository.findAll(Specification.where(specification), pageable).map(userMapper::convertToDto);
    }

    public UserDTO getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new BadRequestAlertException("No such User!"));

        UserDTO userDTO = userMapper.convertToDto(user);
        return userDTO;
    }

    @Transactional
    public void updateUserStatus(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new BadRequestAlertException("No such User!"));
        user.setFullName(userDTO.getFullName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setEmail(userDTO.getEmail());
        user.setEnabled(userDTO.isEnabled());
    }

    public Boolean checkPhoneNumberUsed(Long phoneNumber) {
        Optional<User> user = userRepository.findOneByPhoneNumber(phoneNumber);
        return user.isPresent();
    }

    @Transactional
    public String updateProfileImage(String imageUrl) {
        if(imageUrl == null || imageUrl.equals("")) throw new BadRequestAlertException("Invalid URL!");
        User user = getCurrentUser().orElseThrow(() -> new BadRequestAlertException("Invalid User!"));
        user.setImageUrl(imageUrl);
        return imageUrl;
    }

    public List<UserDTO> getUsers(MultiValueMap<String, String> queryParams) {
        if(queryParams.containsKey("username")) return userRepository.findAllByUsername(queryParams.getFirst("username"))
                .stream().map(userMapper::convertToDtoUser).collect(Collectors.toList());
        return userRepository.findAll().stream().map(userMapper::convertToDtoUser).collect(Collectors.toList());
    }

    public UserDTO editUsers(UserDTO userDTO) {
        User user = userRepository.findById(userDTO.getId()).orElseThrow(() -> new BadRequestAlertException("Invalid ID!"));
        user.setEnabled(userDTO.isEnabled());
        user.setFullName(userDTO.getFullName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user = userRepository.save(user);
        return userMapper.convertToDto(user);
    }

    public UserDTO resetPassword(UserDTO userDTO) {
        User user = userRepository.findById(userDTO.getId()).orElseThrow(() -> new BadRequestAlertException("Invalid ID!"));
        user.setPassword(userDTO.getPassword());
        return userMapper.convertToDto(user);
    }
}
