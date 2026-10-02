package org.example.mcdashboard.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class JwtUtil {

    private static final String ALGORITHM = "HmacSHA256";
    private static final long EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24h

    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(String username) {
        long now = System.currentTimeMillis();
        long exp = now + EXPIRATION_MS;

        String header = base64Encode("{\"alg\":\"HS256\",\"typ\":\"JWT\"}");
        String payload = base64Encode("{\"sub\":\"" + username + "\",\"iat\":" + now / 1000 + ",\"exp\":" + exp / 1000 + "}");

        String signature = sign(header + "." + payload);
        return header + "." + payload + "." + signature;
    }

    public String extractUsername(String token) {
        String payload = decodePayload(token);
        int subStart = payload.indexOf("\"sub\":\"") + 7;
        int subEnd = payload.indexOf("\"", subStart);
        return payload.substring(subStart, subEnd);
    }

    public boolean isValid(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) return false;

            String expectedSig = sign(parts[0] + "." + parts[1]);
            if (!expectedSig.equals(parts[2])) return false;

            String payload = decodePayload(token);
            int expStart = payload.indexOf("\"exp\":") + 6;
            int expEnd = payload.indexOf("}", expStart);
            if (expEnd == -1) expEnd = payload.indexOf(",", expStart);
            if (expEnd == -1) expEnd = payload.length();
            long exp = Long.parseLong(payload.substring(expStart, expEnd).trim());

            return exp > System.currentTimeMillis() / 1000;
        } catch (Exception e) {
            return false;
        }
    }

    private String sign(String data) {
        try {
            Mac mac = Mac.getInstance(ALGORITHM);
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), ALGORITHM));
            byte[] hash = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Error signing JWT", e);
        }
    }

    private String base64Encode(String input) {
        return Base64.getUrlEncoder().withoutPadding()
                .encodeToString(input.getBytes(StandardCharsets.UTF_8));
    }

    private String decodePayload(String token) {
        String[] parts = token.split("\\.");
        return new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
    }
}
