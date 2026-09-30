CREATE TABLE players (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(64) NOT NULL UNIQUE,
    platform    VARCHAR(10) NOT NULL,
    first_seen  TIMESTAMPTZ NOT NULL DEFAULT now()
);
