package mm.shop.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import mm.shop.DTO.AuthResponse;
import mm.shop.DTO.UserDTO;
import mm.shop.exceptions.UserNotFoundException;
import mm.shop.models.User;
import mm.shop.services.JwtService;
import mm.shop.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        log.info("Finding all users");

        List<UserDTO> users = userService.findAllUsers();
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMe(@RequestHeader("Authorization") String token) {
        log.info("Finding current user");

        String trimmedToken = token.substring(7).trim();

        String email = jwtService.getEmailFromToken(trimmedToken);
        UserDTO user = userService.findByEmail(email).orElseThrow(() ->
                new UserNotFoundException("User not found"));

        return ResponseEntity.ok().body(user);

    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable(value = "id") Long id) {
        log.info("Finding user by id: " + id);
        Optional<UserDTO> optUser = userService.findById(id);
        UserDTO user = optUser.orElseThrow(() -> new UserNotFoundException("User not found"));

        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/create")
    public ResponseEntity<AuthResponse> createUserJSON(
            @RequestBody User user) {
        log.info("Creating new user: " + user.getEmail());
        UserDTO createdUser = userService.createUser(
                user.getName(),
                user.getSurname(),
                user.getPassword(),
                user.getEmail()
        );
//        URI location = URI.create("/users/" + createdUser.id());
        String token = jwtService.generateToken(createdUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token));
    }

    // TODO? change to JSON for frontend???
    @PutMapping("/{id}/role")
    public ResponseEntity<String> changeUserRole(
            @PathVariable(value="id") Long id,
            @RequestParam(value="role") String role) {
        role = role.toUpperCase();
        log.info("Changing user role with ID: "+id + " to " + role);

        if (!role.equals("ADMIN") && !role.equals("USER")) {
            return ResponseEntity.badRequest().body("Invalid role");
        }

        userService.changeUserRole(id, role);

        return ResponseEntity.ok("Role for user "+id+" changed to "+role);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable(value="id") Long id) {
        log.info("Deleting user with ID: "+id);
        userService.deleteUser(id);
        return ResponseEntity.ok("User with ID: "+id+" deleted.");
    }

}
