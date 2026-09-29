package org.example.mcdashboard.service;

import org.example.mcdashboard.dto.response.PlayerResponse;
import org.example.mcdashboard.mapper.PlayerMapper;
import org.example.mcdashboard.model.Player;
import org.example.mcdashboard.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PlayerMapper playerMapper;

    public PlayerService(PlayerRepository playerRepository, PlayerMapper playerMapper) {
        this.playerRepository = playerRepository;
        this.playerMapper = playerMapper;
    }

    public List<PlayerResponse> getAllPlayers() {
        return playerRepository.findAll().stream()
                .map(playerMapper::toDto)
                .toList();
    }

    public PlayerResponse getPlayer(Long id) {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Player not found"));
        return playerMapper.toDto(player);
    }
}
