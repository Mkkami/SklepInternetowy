package mm.shop.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mm.shop.DTO.UserDTO;
import mm.shop.DTO.mappers.UserMapper;
import mm.shop.exceptions.UserAlreadyExistsException;
import mm.shop.exceptions.UserNotFoundException;
import mm.shop.models.Role;
import mm.shop.models.User;
import mm.shop.repositories.RoleRepository;
import mm.shop.repositories.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.rmi.server.LogStream.log;

@Slf4j
@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;


    public UserDTO createUser(String name, String surname, String password, String email) throws UserAlreadyExistsException  {
        log.info("Creating user: " + email);
        if (userRepository.existsByEmail(email)) {
            throw new UserAlreadyExistsException("Email jest już zarejestrowany.");
        }

        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(name, surname, hashedPassword, email);
        userRepository.save(user);

        return userMapper.apply(user);
    }

    public void addRole(String roleName, String email) {
        log.info("Adding role: " + roleName + " to user: " + email);
        Role role = roleRepository.findByName(roleName);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        user.getRoles().add(role);
    }

    public void deleteRole(String roleName, String email) {
        log.info("Deleting role: " + roleName + " from user: " + email);
        Role role = roleRepository.findByName(roleName);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
        user.getRoles().remove(role);
    }

    public Optional<UserDTO> findById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::apply);
    }

    public Optional<UserDTO> findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userMapper::apply);
    }

    public List<UserDTO> findAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::apply)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Collection<SimpleGrantedAuthority> auths = new ArrayList<>();
        user.getRoles().forEach(role -> auths.add(new SimpleGrantedAuthority(role.getName())));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), auths);
    }
}
