package org.example.mcdashboard.repository;

import org.example.mcdashboard.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByPlayerId(Long playerId);
    List<Session> findByLeftAtIsNull();
}
