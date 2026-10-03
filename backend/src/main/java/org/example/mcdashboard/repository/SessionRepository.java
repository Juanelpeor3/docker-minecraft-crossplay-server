package org.example.mcdashboard.repository;

import org.example.mcdashboard.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {
    @Query("SELECT s FROM Session s JOIN FETCH s.player WHERE s.player.id = :playerId ORDER BY s.joinedAt DESC")
    List<Session> findByPlayerId(@Param("playerId") Long playerId);

    List<Session> findByLeftAtIsNull();
}
