package org.example.mcdashboard.controller;

import org.example.mcdashboard.dto.request.CommandRequest;
import org.example.mcdashboard.dto.request.WhitelistRequest;
import org.example.mcdashboard.service.ServerStatusService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ServerStatusService serverStatusService;

    public AdminController(ServerStatusService serverStatusService) {
        this.serverStatusService = serverStatusService;
    }

    @PostMapping("/command")
    public Map<String, String> executeCommand(@RequestBody CommandRequest request) {
        String result = serverStatusService.executeCommand(request.command());
        return Map.of("result", result);
    }

    @PostMapping("/whitelist")
    public Map<String, String> whitelist(@RequestBody WhitelistRequest request) {
        String command = "whitelist " + request.action() + " " + request.player();
        String result = serverStatusService.executeCommand(command);
        return Map.of("result", result);
    }
}
