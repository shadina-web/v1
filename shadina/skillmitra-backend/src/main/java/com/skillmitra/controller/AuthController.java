package com.skillmitra.controller;

import com.skillmitra.dto.AuthRequest;
import com.skillmitra.dto.AuthResponse;
import com.skillmitra.dto.RegisterRequest;
import com.skillmitra.model.User;
import com.skillmitra.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest req) {
        User created = userService.register(req);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest req) {
        AuthResponse resp = userService.login(req.getEmail(), req.getPassword());
        return ResponseEntity.ok(resp);
    }
}
