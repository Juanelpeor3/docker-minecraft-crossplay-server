package org.example.mcdashboard.controller;

import org.example.mcdashboard.dto.response.PlayerResponse;
import org.example.mcdashboard.dto.response.SessionResponse;
import org.example.mcdashboard.service.PlayerService;
import org.example.mcdashboard.service.SessionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerService playerService;
    private final SessionService sessionService;

    public PlayerController(PlayerService playerService, SessionService sessionService) {
        this.playerService = playerService;
        this.sessionService = sessionService;
    }

    @GetMapping
    public List<PlayerResponse> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping("/{id}")
    public PlayerResponse getPlayer(@PathVariable Long id) {
        return playerService.getPlayer(id);
    }

    @GetMapping("/{id}/sessions")
    public List<SessionResponse> getPlayerSessions(@PathVariable Long id) {
        return sessionService.getSessionsByPlayer(id);
    }
}
