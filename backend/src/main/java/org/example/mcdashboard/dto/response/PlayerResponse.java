package org.example.mcdashboard.dto.response;

import java.time.Instant;

public record PlayerResponse(Long id, String name, String platform, Instant firstSeen) {}
