package org.example.mcdashboard.controller;

import org.example.mcdashboard.dto.response.ServerStatusResponse;
import org.example.mcdashboard.service.ServerStatusService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/status")
public class ServerStatusController {

    private final ServerStatusService serverStatusService;

    public ServerStatusController(ServerStatusService serverStatusService) {
        this.serverStatusService = serverStatusService;
    }

    @GetMapping
    public ServerStatusResponse getStatus() {
        return serverStatusService.getStatus();
    }
}
