package org.example.mcdashboard.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RconConfig {

    @Value("${rcon.host}")
    private String host;

    @Value("${rcon.port}")
    private int port;

    @Value("${rcon.password}")
    private String password;

    public String getHost() { return host; }
    public int getPort() { return port; }
    public String getPassword() { return password; }
}
