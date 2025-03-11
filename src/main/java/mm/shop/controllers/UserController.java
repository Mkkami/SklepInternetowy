package mm.shop.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import mm.shop.models.User;
import mm.shop.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/users")
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/find")
    public ResponseEntity<User> getUser(
            @RequestParam String username) {
        log.info("Finding user: " + username);
        Optional<User> optUser = userService.findByUsername(username);
        User user = optUser.orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable(value = "id") Long id) {
        log.info("Finding user by id: " + id);
        Optional<User> optUser = userService.findById(id);
        User user = optUser.orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUserJSON(
            @RequestBody User user) {
        userService.createUser(user);

        return ResponseEntity.created(URI.create("/users/find")).body(user);
    }

}
