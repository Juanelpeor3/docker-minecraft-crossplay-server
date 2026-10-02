package org.example.mcdashboard.controller;

import org.example.mcdashboard.dto.response.SessionResponse;
import org.example.mcdashboard.service.SessionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping
    public Page<SessionResponse> getAllSessions(Pageable pageable) {
        return sessionService.getAllSessions(pageable);
    }
}
