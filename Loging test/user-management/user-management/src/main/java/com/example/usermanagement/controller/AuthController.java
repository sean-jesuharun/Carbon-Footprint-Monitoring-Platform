package com.example.usermanagement.controller;

import com.example.usermanagement.model.User;
import com.example.usermanagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public User signup(@RequestParam String email, @RequestParam String username, @RequestParam String password) {
        return authService.signup(email, username, password);
    }

    @PostMapping("/login")
    public User login(@RequestParam String username, @RequestParam String password) {
        return authService.login(username, password);
    }
}
