package mm.shop.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mm.shop.models.User;
import mm.shop.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void createUser(String username, String password, String email) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email jest już zarejestrowany.");
        } else if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Nazwa użytkownika jest zajęta.");
        }
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(username, hashedPassword, email);

        userRepository.save(user);
    }

    public void createUser(User user) {
        userRepository.save(user);
    }


    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long id) {return userRepository.findById(id); }
}
