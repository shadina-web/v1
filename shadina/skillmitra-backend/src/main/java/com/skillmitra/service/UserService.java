package com.skillmitra.service;

import com.skillmitra.dto.AuthResponse;
import com.skillmitra.dto.RegisterRequest;
import com.skillmitra.model.User;
import com.skillmitra.repository.UserRepository;
import com.skillmitra.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public User register(RegisterRequest req) {
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        if (userRepository.findByPhone(req.getPhone()).isPresent()) {
            throw new RuntimeException("Phone already registered");
        }

        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(req.getRole().toUpperCase())
                .preferredLanguage(req.getPreferredLanguage() != null ? req.getPreferredLanguage() : "en")
                .build();

        return userRepository.save(user);
    }

    public AuthResponse login(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (AuthenticationException ex) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtUtil.generateToken(email);
        return new AuthResponse(token);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateLanguagePreference(String email, String languageCode) {
        User user = findByEmail(email);
        user.setPreferredLanguage(languageCode);
        return userRepository.save(user);
    }

    public User updateProfile(String email, String name, String phone, String location, 
                             String bio, String avatar, java.util.List<String> skills, 
                             java.util.List<String> interests, String preferredLanguage) {
        User user = findByEmail(email);
        
        if (name != null && !name.trim().isEmpty()) {
            user.setName(name);
        }
        if (phone != null && !phone.trim().isEmpty()) {
            user.setPhone(phone);
        }
        if (location != null) {
            user.setLocation(location);
        }
        if (bio != null) {
            user.setBio(bio);
        }
        if (avatar != null) {
            user.setAvatar(avatar);
        }
        if (skills != null) {
            user.setSkills(skills);
        }
        if (interests != null) {
            user.setInterests(interests);
        }
        if (preferredLanguage != null) {
            user.setPreferredLanguage(preferredLanguage);
        }
        
        return userRepository.save(user);
    }

    public java.util.List<User> findAllWorkers() {
        return userRepository.findAll().stream()
                .filter(user -> "WORKER".equals(user.getRole()))
                .collect(java.util.stream.Collectors.toList());
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
