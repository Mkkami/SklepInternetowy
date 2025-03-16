package mm.shop.services;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import mm.shop.DTO.UserDTO;
import mm.shop.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtService {

    @Value("${security.jwt.secret-key}")
    private String secretKey;
    private final long JWT_EXPIRATION = 604_800_000L; // 7 dni

    public String generateToken(UserDTO userDTO) {
        return Jwts.builder()
                .subject(userDTO.email())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(getSignKey())
                .compact();
    }

    private Key getSignKey() {
        byte [] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getEmailFromToken(String token) {
        JwtParser parser = Jwts.parser()
                .setSigningKey(secretKey)
                .build();
        return parser.parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            JwtParser parser = Jwts.parser()
                    .setSigningKey(secretKey)
                    .build();
            parser.parseClaimsJws(token);  // Jeżeli wyjątek nie wystąpi, token jest prawidłowy
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
