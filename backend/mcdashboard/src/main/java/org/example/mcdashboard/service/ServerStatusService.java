package org.example.mcdashboard.service;

import org.example.mcdashboard.config.RconConfig;
import org.example.mcdashboard.dto.response.PlayerResponse;
import org.example.mcdashboard.dto.response.ServerStatusResponse;
import org.example.mcdashboard.mapper.PlayerMapper;
import org.example.mcdashboard.model.Platform;
import org.example.mcdashboard.model.Player;
import org.example.mcdashboard.model.Session;
import org.example.mcdashboard.repository.PlayerRepository;
import org.example.mcdashboard.repository.SessionRepository;
import org.example.mcdashboard.util.RconClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ServerStatusService {

    private static final Logger log = LoggerFactory.getLogger(ServerStatusService.class);
    private static final Pattern LIST_PATTERN =
            Pattern.compile("There are (\\d+) of a max of (\\d+) players online:(.*)");

    private final RconConfig rconConfig;
    private final PlayerRepository playerRepository;
    private final SessionRepository sessionRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final PlayerMapper playerMapper;

    private Set<String> previousPlayers = new HashSet<>();
    private ServerStatusResponse lastStatus = new ServerStatusResponse(false, 0, 0, List.of());

    public ServerStatusService(RconConfig rconConfig,
                               PlayerRepository playerRepository,
                               SessionRepository sessionRepository,
                               SimpMessagingTemplate messagingTemplate,
                               PlayerMapper playerMapper) {
        this.rconConfig = rconConfig;
        this.playerRepository = playerRepository;
        this.sessionRepository = sessionRepository;
        this.messagingTemplate = messagingTemplate;
        this.playerMapper = playerMapper;
    }

    public ServerStatusResponse getStatus() {
        return lastStatus;
    }

    public String executeCommand(String command) {
        try (RconClient rcon = new RconClient(rconConfig.getHost(), rconConfig.getPort(), rconConfig.getPassword())) {
            return rcon.sendCommand(command);
        } catch (Exception e) {
            throw new RuntimeException("RCON command failed: " + e.getMessage(), e);
        }
    }

    @Scheduled(fixedDelay = 15000)
    public void pollServerStatus() {
        try (RconClient rcon = new RconClient(rconConfig.getHost(), rconConfig.getPort(), rconConfig.getPassword())) {
            String response = rcon.sendCommand("list");
            Matcher matcher = LIST_PATTERN.matcher(response);

            if (!matcher.matches()) {
                lastStatus = new ServerStatusResponse(true, 0, 0, List.of());
                return;
            }

            int online = Integer.parseInt(matcher.group(1));
            int max = Integer.parseInt(matcher.group(2));
            String playerList = matcher.group(3).trim();

            Set<String> currentPlayers = new HashSet<>();
            List<PlayerResponse> onlineDtos = new ArrayList<>();

            if (!playerList.isEmpty()) {
                for (String raw : playerList.split(",\\s*")) {
                    String name = raw.trim();
                    if (name.isEmpty()) continue;
                    currentPlayers.add(name);

                    Platform platform = name.startsWith(".") ? Platform.BEDROCK : Platform.JAVA;
                    Player player = playerRepository.findByName(name)
                            .orElseGet(() -> playerRepository.save(new Player(name, platform)));

                    onlineDtos.add(playerMapper.toDto(player));
                }
            }

            // Detect joins
            for (String name : currentPlayers) {
                if (!previousPlayers.contains(name)) {
                    Platform platform = name.startsWith(".") ? Platform.BEDROCK : Platform.JAVA;
                    Player player = playerRepository.findByName(name).orElseThrow();
                    sessionRepository.save(new Session(player, platform));
                    log.info("Player joined: {} ({})", name, platform);
                }
            }

            // Detect leaves
            for (String name : previousPlayers) {
                if (!currentPlayers.contains(name)) {
                    Player player = playerRepository.findByName(name).orElse(null);
                    if (player != null) {
                        sessionRepository.findByLeftAtIsNull().stream()
                                .filter(s -> s.getPlayer().getId().equals(player.getId()))
                                .findFirst()
                                .ifPresent(s -> {
                                    s.setLeftAt(Instant.now());
                                    sessionRepository.save(s);
                                    log.info("Player left: {}", name);
                                });
                    }
                }
            }

            previousPlayers = currentPlayers;
            lastStatus = new ServerStatusResponse(true, online, max, onlineDtos);
            messagingTemplate.convertAndSend("/topic/status", lastStatus);

        } catch (Exception e) {
            log.warn("Failed to poll server status: {}", e.getMessage());
            lastStatus = new ServerStatusResponse(false, 0, 0, List.of());
        }
    }
}
