package org.example.mcdashboard.mapper;

import org.example.mcdashboard.dto.response.SessionResponse;
import org.example.mcdashboard.model.Session;
import org.springframework.stereotype.Component;

@Component
public class SessionMapper {

    public SessionResponse toDto(Session session) {
        return new SessionResponse(
                session.getId(),
                session.getPlayer().getId(),
                session.getPlayer().getName(),
                session.getPlatform().name(),
                session.getJoinedAt(),
                session.getLeftAt()
        );
    }
}
