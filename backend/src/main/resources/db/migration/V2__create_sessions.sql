CREATE TABLE sessions (
    id          BIGSERIAL PRIMARY KEY,
    player_id   BIGINT NOT NULL REFERENCES players(id),
    joined_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    left_at     TIMESTAMPTZ,
    platform    VARCHAR(10) NOT NULL
);
CREATE INDEX idx_sessions_player ON sessions(player_id);
