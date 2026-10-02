package org.example.mcdashboard.mapper;

import org.example.mcdashboard.dto.response.PlayerResponse;
import org.example.mcdashboard.model.Player;
import org.springframework.stereotype.Component;

@Component
public class PlayerMapper {

    public PlayerResponse toDto(Player player) {
        return new PlayerResponse(
                player.getId(),
                player.getName(),
                player.getPlatform().name(),
                player.getFirstSeen()
        );
    }
}
