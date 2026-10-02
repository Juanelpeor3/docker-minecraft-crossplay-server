package org.example.mcdashboard.dto.response;

import java.time.Instant;

public record SessionResponse(Long id, Long playerId, String playerName, String platform,
                               Instant joinedAt, Instant leftAt) {}
