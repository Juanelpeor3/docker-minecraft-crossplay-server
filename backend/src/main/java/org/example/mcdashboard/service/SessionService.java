package org.example.mcdashboard.service;

import org.example.mcdashboard.dto.response.SessionResponse;
import org.example.mcdashboard.mapper.SessionMapper;
import org.example.mcdashboard.repository.SessionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class SessionService {

    private final SessionRepository sessionRepository;
    private final SessionMapper sessionMapper;

    public SessionService(SessionRepository sessionRepository, SessionMapper sessionMapper) {
        this.sessionRepository = sessionRepository;
        this.sessionMapper = sessionMapper;
    }

    public Page<SessionResponse> getAllSessions(Pageable pageable) {
        return sessionRepository.findAll(pageable).map(sessionMapper::toDto);
    }

    public List<SessionResponse> getSessionsByPlayer(Long playerId) {
        return sessionRepository.findByPlayerId(playerId).stream()
                .map(sessionMapper::toDto)
                .toList();
    }
}
