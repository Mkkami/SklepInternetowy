package mm.shop.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mm.shop.DTO.UserDTO;
import mm.shop.DTO.mappers.UserMapper;
import mm.shop.exceptions.UserAlreadyExistsException;
import mm.shop.exceptions.UserNotFoundException;
import mm.shop.models.User;
import mm.shop.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;


    public UserDTO createUser(String username, String password, String email) {
        if (userRepository.existsByEmail(email)) {
            throw new UserAlreadyExistsException("Email jest już zarejestrowany.");
        }
        else if (userRepository.existsByUsername(username)) {
            throw new UserAlreadyExistsException("Nazwa użytkownika jest zajęta.");
        }

        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(username, hashedPassword, email);
        userRepository.save(user);

        return userMapper.apply(user);
    }

    public void changeUserRole(Long id, String newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Użytkownik nie znaleziony."));

        user.setRole(newRole.toUpperCase());

        userRepository.save(user);
    }


    public Optional<UserDTO> findByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::apply);
    }

    public Optional<UserDTO> findById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::apply);
    }

    public List<UserDTO> findAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::apply)
                .collect(Collectors.toList());
    }
}
