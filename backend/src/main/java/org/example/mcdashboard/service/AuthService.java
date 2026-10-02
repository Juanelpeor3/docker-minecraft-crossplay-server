package org.example.mcdashboard.service;

import org.example.mcdashboard.util.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final JwtUtil jwtUtil;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    public AuthService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public String login(String username, String password) {
        if (adminUsername.equals(username) && adminPassword.equals(password)) {
            return jwtUtil.generateToken(username);
        }
        throw new IllegalArgumentException("Invalid credentials");
    }
}
