package org.example.mcdashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class McdashboardApplication {

    public static void main(String[] args) {
        SpringApplication.run(McdashboardApplication.class, args);
    }

}
