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

**Español** | [English](README.md)

</div>

Servidor de Minecraft con soporte crossplay entre **Java Edition** y **Bedrock Edition** usando Docker, GeyserMC y Floodgate. Incluye un **dashboard de administracion** con tracking de jugadores en tiempo real, historial de sesiones y gestion del servidor.

> [!IMPORTANT]
> Al establecer `EULA=TRUE` en tu archivo `.env`, estas aceptando el [Acuerdo de Licencia de Usuario Final de Minecraft](https://www.minecraft.net/es-es/eula).

> [!NOTE]
> Este proyecto no esta afiliado, mantenido, autorizado ni respaldado por Mojang Studios, Microsoft, ni ninguna de sus filiales o subsidiarias.

## Arquitectura

```
 Fuera de Docker              docker-compose · red interna
┌──────────────┐     ┌─────────────────────────────────────────────┐
│  Jugadores   │     │  SERVIDOR DE JUEGO                          │
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
│  Navegador   │     │  │ Angular + nginx│                         │
└──────────────┘     │  └────────────────┘                         │
                     └─────────────────────────────────────────────┘
```

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) y Docker Compose instalados

## Inicio rapido

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Juanelpeor3/docker-minecraft-crossplay-server.git
   cd docker-minecraft-crossplay-server
   ```

2. **Crear el archivo de configuracion:**

   ```bash
   cp .env.example .env
   ```

   Edita `.env` con tus preferencias (nombre del servidor, dificultad, contrasenas, etc.)

3. **Iniciar el servidor:**

   ```bash
   # Solo servidor Minecraft (sin dashboard)
   docker compose up -d

   # Stack completo: Minecraft + Dashboard
   docker compose --profile dashboard up -d
   ```

4. **Ver los logs:**

   ```bash
   docker compose logs -f
   ```

## Conexion

| Plataforma | Direccion | Puerto |
|---|---|---|
| Java Edition (PC) | `ip` | `25565` |
| Bedrock Edition (celular, consola, Windows) | `ip` | `19132` |
| Dashboard | `http://ip:4200` | `4200` |

Para jugar en red local, usa `localhost` o `127.0.0.1` como direccion.

## Dashboard

El dashboard de administracion provee monitoreo y gestion en tiempo real de tu servidor de Minecraft.

### Funcionalidades

- **Estado en tiempo real**: Jugadores online, estado del servidor via WebSocket
- **Tracking de jugadores**: Lista historica con deteccion de plataforma (Java/Bedrock)
- **Historial de sesiones**: Registro de conexiones/desconexiones con duracion
- **Panel de admin**: Ejecutar comandos RCON y gestionar la whitelist
- **Autenticacion JWT**: Acceso seguro con login

### Modo demo

El frontend incluye un modo demo con datos mock, ideal para desplegar sin necesidad de un backend:

```bash
cd frontend

# Desarrollo local con mocks
pnpm start:demo

# Build de produccion para deploy
pnpm build:demo
```

Credenciales demo: `admin` / `Admin123`

## Perfiles de Docker Compose

| Comando | Que levanta |
|---|---|
| `docker compose up -d` | Solo Minecraft + backups |
| `docker compose --profile dashboard up -d` | Minecraft + backups + PostgreSQL + backend + frontend |

## Comandos utiles

```bash
# Iniciar el servidor
docker compose up -d

# Iniciar con dashboard
docker compose --profile dashboard up -d

# Detener el servidor
docker compose down

# Ver logs en tiempo real
docker compose logs -f

# Ejecutar comandos en la consola del servidor
docker exec -i minecraft-server rcon-cli

# Reiniciar el servidor
docker compose restart
```

## Estructura del proyecto

```
├── docker-compose.yml       # Orquestacion Docker
├── .env.example             # Plantilla de variables de entorno
├── backend/                 # API Spring Boot
│   ├── Dockerfile
│   └── src/
├── frontend/                # SPA Angular
│   ├── Dockerfile
│   └── src/
│       └── app/
│           ├── pages/       # Dashboard, Players, Admin, Login
│           ├── services/    # API, Auth, WebSocket
│           │   └── mock/    # Servicios mock para modo demo
│           └── shared/      # Componentes reutilizables
├── data/                    # Datos del servidor (generado automaticamente)
└── backups/                 # Backups del servidor (generado automaticamente)
```

## Plugins incluidos

- **[GeyserMC](https://geysermc.org/)**: Permite a jugadores de Bedrock conectarse al servidor de Java
- **[Floodgate](https://wiki.geysermc.org/floodgate/)**: Permite autenticacion con Xbox Live (sin cuenta Java)
- **[ViaVersion](https://viaversion.com/)**: Permite que clientes de versiones mas nuevas se conecten mientras Paper actualiza

## Whitelist

Activa la whitelist en tu `.env`:

```bash
ENABLE_WHITELIST=true
WHITELIST=JugadorJava1,JugadorJava2
```

**Jugadores Bedrock** no se pueden agregar desde el `.env`. Usa el comando de Floodgate desde la consola:

```bash
# Entrar a la consola del servidor
docker exec -i minecraft-server rcon-cli

# Agregar jugador Bedrock
fwhitelist add NombreXboxLive
```

## Configuracion avanzada

### Agregar mas plugins

Agrega URLs de descarga directa a la variable `PLUGINS` en [docker-compose.yml](docker-compose.yml), o usa `MODRINTH_PROJECTS` para plugins de Modrinth:

```yaml
# Descarga directa
PLUGINS: |
  https://url-del-plugin.jar

# Desde Modrinth
MODRINTH_PROJECTS: nombre-del-plugin
```

### Cambiar la version de Minecraft

Agrega la variable `VERSION` en el `environment` del [docker-compose.yml](docker-compose.yml):

```yaml
VERSION: "26.3"
```

Por defecto usa la ultima version estable.

## License

[MIT](LICENSE.md)