package com.skillmitra.controller;

import com.skillmitra.dto.LanguagePreferenceRequest;
import com.skillmitra.dto.UpdateProfileRequest;
import com.skillmitra.model.User;
import com.skillmitra.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Get current user's language preference
     */
    @GetMapping("/language-preference")
    public ResponseEntity<Map<String, String>> getLanguagePreference(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email);
        
        Map<String, String> response = new HashMap<>();
        response.put("languageCode", user.getPreferredLanguage() != null ? user.getPreferredLanguage() : "en");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Update current user's language preference
     */
    @PutMapping("/language-preference")
    public ResponseEntity<Map<String, String>> updateLanguagePreference(
            @Valid @RequestBody LanguagePreferenceRequest request,
            Authentication authentication) {
        
        String email = authentication.getName();
        User user = userService.updateLanguagePreference(email, request.getLanguageCode());
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Language preference updated successfully");
        response.put("languageCode", user.getPreferredLanguage());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get current user profile
     */
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email);
        
        // Don't send password to frontend
        user.setPassword(null);
        
        return ResponseEntity.ok(user);
    }

    /**
     * Update current user profile
     */
    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        
        String email = authentication.getName();
        User updatedUser = userService.updateProfile(
            email,
            request.getName(),
            request.getPhone(),
            request.getLocation(),
            request.getBio(),
            request.getAvatar(),
            request.getSkills(),
            request.getInterests(),
            request.getPreferredLanguage()
        );
        
        // Don't send password to frontend
        updatedUser.setPassword(null);
        
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        data.put("user", updatedUser);
        
        response.put("message", "Profile updated successfully");
        response.put("data", data);
        
        return ResponseEntity.ok(response);
    }
}
