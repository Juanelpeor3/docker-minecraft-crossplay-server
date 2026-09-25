# Minecraft Crossplay Server (Docker)

[Español](README.es.md) | **English**

Minecraft server with crossplay support between **Java Edition** and **Bedrock Edition** using Docker, GeyserMC and Floodgate.

> **Note:** Bedrock players cannot join until Paper updates to the latest Minecraft version and GeyserMC releases a compatible build.

> **Warning:** By setting `EULA=TRUE` in your `.env` file, you are accepting the [Minecraft End User License Agreement](https://www.minecraft.net/en-us/eula).

> **Disclaimer:** This project is not affiliated with, maintained, authorized, or endorsed by Mojang Studios, Microsoft, or any of their subsidiaries or affiliates.

## Requirements

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose installed

## Quick start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tu-usuario/docker-minecraft-crossplay-server.git
   cd docker-minecraft-crossplay-server
   ```

2. **Create the configuration file:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your preferences (server name, difficulty, etc.)

3. **Start the server:**

   ```bash
   docker compose up -d
   ```

4. **View the logs:**

   ```bash
   docker compose logs -f
   ```

## Connection

| Platform | Address | Port |
|---|---|---|
| Java Edition (PC) | `ip` | `25565` |
| Bedrock Edition (mobile, console, Windows) | `ip` | `19132` |

For local network play, use `localhost` or `127.0.0.1` as the address.

## Useful commands

```bash
# Start the server
docker compose up -d

# Stop the server
docker compose down

# View logs in real time
docker compose logs -f

# Execute commands in the server console
docker exec -i minecraft-server rcon-cli

# Restart the server
docker compose restart
```

## Project structure

```
.
├── docker-compose.yml   # Docker configuration
├── .env.example         # Environment variables (template)
├── .env                 # Environment variables (your config)
├── .gitignore
├── README.md
└── data/                # Server data (auto-generated)
    ├── world/           # Server world
    ├── plugins/         # Plugins (GeyserMC, Floodgate, etc.)
    └── ...
```

## Included plugins

- **[GeyserMC](https://geysermc.org/)** — Allows Bedrock players to connect to the Java server
- **[Floodgate](https://wiki.geysermc.org/floodgate/)** — Allows authentication via Xbox Live (no Java account needed)

## Whitelist

Enable the whitelist in your `.env`:

```bash
ENABLE_WHITELIST=true
WHITELIST=JavaPlayer1,JavaPlayer2
```

**Bedrock players** cannot be added from the `.env`. Use the Floodgate command from the console:

```bash
# Enter the server console
docker exec -i minecraft-server rcon-cli

# Add a Bedrock player
fwhitelist add XboxLiveName
```

## Advanced configuration

### Adding more plugins

Add direct download URLs to the `PLUGINS` variable in [docker-compose.yml](docker-compose.yml), or use `MODRINTH_PROJECTS` for Modrinth plugins:

```yaml
# Direct download
PLUGINS: |
  https://plugin-url.jar

# From Modrinth
MODRINTH_PROJECTS: plugin-name
```

### Changing the Minecraft version

Add the `VERSION` variable in the `environment` section of [docker-compose.yml](docker-compose.yml):

```yaml
VERSION: "26.3"
```

By default it uses the latest stable version.
