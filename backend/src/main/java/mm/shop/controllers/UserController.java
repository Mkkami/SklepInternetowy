package mm.shop.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mm.shop.DTO.AuthResponse;
import mm.shop.DTO.UserDTO;
import mm.shop.exceptions.UserNotFoundException;
import mm.shop.models.User;
import mm.shop.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        log.info("Finding all users");

        List<UserDTO> users = userService.findAllUsers();
        return ResponseEntity.ok().body(users);
    }

//    @GetMapping("/user/me")
//    public ResponseEntity<UserDTO> getMe(@RequestHeader("Authorization") String token) {
//        log.info("Finding current user");
//
//        String trimmedToken = token.substring(7).trim();
//
//        String email = jwtService.getEmailFromToken(trimmedToken);
//        UserDTO user = userService.findByEmail(email).orElseThrow(() ->
//                new UserNotFoundException("User not found"));
//
//        return ResponseEntity.ok().body(user);
//    }

    @PostMapping("/user/create")
    public ResponseEntity<?> createUserJSON(
            @RequestBody User user) {
        log.info("Creating new user: " + user.getEmail());
        UserDTO createdUser = userService.createUser(
                user.getName(),
                user.getSurname(),
                user.getPassword(),
                user.getEmail()
        );
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/user/create").toUriString());

        return ResponseEntity.created(uri).body(createdUser);
    }
    @PostMapping("/user/addRole")
    public ResponseEntity<?> addRoleToUser(
            @RequestBody RoleRequest rolereq) {
        log.info("Adding role: " + rolereq.getRoleName() + " to user: " + rolereq.getEmail());
        userService.addRole(rolereq.getRoleName(), rolereq.getEmail());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/deleteRole")
    public ResponseEntity<?> deleteRoleFromUser(
            @RequestBody RoleRequest rolereq) {
        log.info("Deleting role: " + rolereq.getRoleName() + " from user: " + rolereq.getEmail());
        userService.deleteRole(rolereq.getRoleName(), rolereq.getEmail());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable(value = "id") Long id) {
        log.info("Finding user by id: " + id);
        Optional<UserDTO> optUser = userService.findById(id);
        UserDTO user = optUser.orElseThrow(() -> new UserNotFoundException("User not found"));

        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable(value="id") Long id) {
        log.info("Deleting user with ID: "+id);
        userService.deleteUser(id);
        return ResponseEntity.ok("User with ID: "+id+" deleted.");
    }
}
@Data
@NoArgsConstructor
@AllArgsConstructor
class RoleRequest {
    String roleName;
    String email;
}