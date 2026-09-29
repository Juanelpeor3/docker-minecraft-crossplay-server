package org.example.mcdashboard.dto.response;

import java.util.List;

public record ServerStatusResponse(boolean online, int playerCount, int maxPlayers,
                                   List<PlayerResponse> players) {}
