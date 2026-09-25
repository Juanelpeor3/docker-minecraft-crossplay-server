# Minecraft Crossplay Server (Docker)

**Español** | [English](README.md)

Servidor de Minecraft con soporte crossplay entre **Java Edition** y **Bedrock Edition** usando Docker, GeyserMC y Floodgate.

> **Nota:** Los jugadores de Bedrock no pueden unirse hasta que Paper se actualice a la ultima version de Minecraft y GeyserMC lance un build compatible.

> **Aviso:** Al establecer `EULA=TRUE` en tu archivo `.env`, estas aceptando el [Acuerdo de Licencia de Usuario Final de Minecraft](https://www.minecraft.net/es-es/eula).

> **Disclaimer:** Este proyecto no esta afiliado, mantenido, autorizado ni respaldado por Mojang Studios, Microsoft, ni ninguna de sus filiales o subsidiarias.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) y Docker Compose instalados

## Inicio rapido

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/docker-minecraft-crossplay-server.git
   cd docker-minecraft-crossplay-server
   ```

2. **Crear el archivo de configuracion:**

   ```bash
   cp .env.example .env
   ```

   Edita `.env` con tus preferencias (nombre del servidor, dificultad, etc.)

3. **Iniciar el servidor:**

   ```bash
   docker compose up -d
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

Para jugar en red local, usa `localhost` o `127.0.0.1` como direccion.

## Comandos utiles

```bash
# Iniciar el servidor
docker compose up -d

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
.
├── docker-compose.yml   # Configuracion de Docker
├── .env.example         # Variables de entorno (plantilla)
├── .env                 # Variables de entorno (tu configuracion)
├── .gitignore
├── README.md
└── data/                # Datos del servidor (generado automaticamente)
    ├── world/           # Mundo del servidor
    ├── plugins/         # Plugins (GeyserMC, Floodgate, etc.)
    └── ...
```

## Plugins incluidos

- **[GeyserMC](https://geysermc.org/)** — Permite a jugadores de Bedrock conectarse al servidor de Java
- **[Floodgate](https://wiki.geysermc.org/floodgate/)** — Permite autenticacion con Xbox Live (sin cuenta Java)

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
