<div align="center">

# Minecraft Crossplay Server

![Angular](https://img.shields.io/badge/Angular-v21-dd0031?style=for-the-badge&logo=angular&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
<br />
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Minecraft](https://img.shields.io/badge/Minecraft-62B47A?style=for-the-badge)
![GeyserMC](https://img.shields.io/badge/GeyserMC-Crossplay-4B8BBE?style=for-the-badge)
<br />
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)](LICENSE)

[Español](README.es.md) | **English**

</div>

Minecraft server with crossplay support between **Java Edition** and **Bedrock Edition** using Docker, GeyserMC and Floodgate. Includes an **admin dashboard** with real-time player tracking, session history, and server management.

> **Warning:** By setting `EULA=TRUE` in your `.env` file, you are accepting the [Minecraft End User License Agreement](https://www.minecraft.net/en-us/eula).

> **Disclaimer:** This project is not affiliated with, maintained, authorized, or endorsed by Mojang Studios, Microsoft, or any of their subsidiaries or affiliates.

## Architecture

```
 Outside Docker               docker-compose · internal network
┌──────────────┐     ┌─────────────────────────────────────────────┐
│   Players    │     │  GAME SERVER                                │
│ Java/Bedrock │────>│  ┌────────────────┐      ┌───────────────┐  │
└──────────────┘     │  │   Minecraft    │<─────│    Backups    │  │
                     │  │ Paper+GeyserMC │      │ itzg/mc-backup│  │
                     │  └────────────────┘      └───────────────┘  │
                     │          ^                                  │
                     │          │ RCON                             │
                     │  DASHBOARD                                  │
                     │  ┌────────────────┐      ┌───────────────┐  │
                     │  │    Backend     │─────>│   Postgres    │  │
                     │  │  Spring Boot   │      │ PostgreSQL 16 │  │
                     │  └────────────────┘      └───────────────┘  │
                     │          ^                                  │
┌──────────────┐     │  ┌────────────────┐                         │
│    Admin     │────>│  │    Frontend    │                         │
│   Browser    │     │  │ Angular + nginx│                         │
└──────────────┘     │  └────────────────┘                         │
                     └─────────────────────────────────────────────┘
```

## Requirements

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose installed

## Quick start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Juanelpeor3/docker-minecraft-crossplay-server.git
   cd docker-minecraft-crossplay-server
   ```

2. **Create the configuration file:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your preferences (server name, difficulty, passwords, etc.)

3. **Start the server:**

   ```bash
   # Minecraft server only (no dashboard)
   docker compose up -d

   # Full stack: Minecraft + Dashboard
   docker compose --profile dashboard up -d
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
| Dashboard | `http://ip:4200` | `4200` |

For local network play, use `localhost` or `127.0.0.1` as the address.

## Dashboard

The admin dashboard provides real-time monitoring and management of your Minecraft server.

### Features

- **Real-time status**: Online players, server status via WebSocket
- **Player tracking**: Historical player list with platform detection (Java/Bedrock)
- **Session history**: Join/leave tracking with duration calculation
- **Admin panel**: Execute RCON commands and manage the whitelist
- **JWT authentication**: Secure access with login

### Demo mode

The frontend includes a demo mode with mock data, ideal for deployment without a running backend:

```bash
cd frontend

# Local development with mocks
pnpm start:demo

# Production build for deployment
pnpm build:demo
```

Demo credentials: `admin` / `Admin123`

## Docker Compose profiles

| Command | What starts |
|---|---|
| `docker compose up -d` | Minecraft + backups only |
| `docker compose --profile dashboard up -d` | Minecraft + backups + PostgreSQL + backend + frontend |

## Useful commands

```bash
# Start the server
docker compose up -d

# Start with dashboard
docker compose --profile dashboard up -d

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
├── docker-compose.yml       # Docker orchestration
├── .env.example             # Environment variables template
├── backend/                 # Spring Boot API
│   ├── Dockerfile
│   └── src/
├── frontend/                # Angular SPA
│   ├── Dockerfile
│   └── src/
│       └── app/
│           ├── pages/       # Dashboard, Players, Admin, Login
│           ├── services/    # API, Auth, WebSocket
│           │   └── mock/    # Demo mode mock services
│           └── shared/      # Reusable components
├── data/                    # Minecraft server data (auto-generated)
└── backups/                 # Server backups (auto-generated)
```

## Included plugins

- **[GeyserMC](https://geysermc.org/)**: Allows Bedrock players to connect to the Java server
- **[Floodgate](https://wiki.geysermc.org/floodgate/)**: Allows authentication via Xbox Live (no Java account needed)
- **[ViaVersion](https://viaversion.com/)**: Allows newer Minecraft clients to connect while Paper updates to the latest version

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

## License

[MIT](LICENSE.md)