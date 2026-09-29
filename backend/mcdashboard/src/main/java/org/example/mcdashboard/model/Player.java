package org.example.mcdashboard.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 64)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Platform platform;

    @Column(name = "first_seen", nullable = false, updatable = false)
    private Instant firstSeen = Instant.now();

    public Player() {}

    public Player(String name, Platform platform) {
        this.name = name;
        this.platform = platform;
    }

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Platform getPlatform() { return platform; }
    public void setPlatform(Platform platform) { this.platform = platform; }

    public Instant getFirstSeen() { return firstSeen; }
}
