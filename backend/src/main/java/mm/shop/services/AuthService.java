package mm.shop.services;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import mm.shop.DTO.AuthResponse;
import mm.shop.DTO.LoginRequest;
import mm.shop.exceptions.UserNotFoundException;
import mm.shop.models.User;
import mm.shop.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.webauthn.api.AuthenticatorResponse;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new UserNotFoundException("Użytkownik nie znaleziony."));

        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new RuntimeException("Złe hasło.");
        }

        String jwtToken = jwtService.generateToken(null);

        return new AuthResponse(jwtToken);
    }
}
