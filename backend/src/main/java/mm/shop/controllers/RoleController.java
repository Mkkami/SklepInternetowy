package mm.shop.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mm.shop.models.Role;
import mm.shop.repositories.RoleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class RoleController {

    private final RoleRepository roleRepository;

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles() {
        log.info("Finding all roles");
        List<Role> roles = roleRepository.findAll();
        return ResponseEntity.ok().body(roles);
    }

    @PostMapping("/role/add")
    public ResponseEntity<Role> saveRole(
            @RequestBody Role role) {
        log.info("Adding role: " + role.getName());
        roleRepository.save(role);
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/role/add").toUriString());
        return ResponseEntity.created(uri).body(role);
    }

    @GetMapping("/role")
    public ResponseEntity<Role> getRoleByName(@RequestBody Role role) {
        log.info("Finding role: " + role.getName());
        Role foundRole = roleRepository.findByName(role.getName());
        return ResponseEntity.ok().body(foundRole);
    }

    @DeleteMapping("/role/delete")
    public ResponseEntity<Role> deleteRole(
            @RequestBody Role role) {
        log.info("Deleting role: " + role.getName());
        Role roleToDelete = roleRepository.findByName(role.getName());
        roleRepository.delete(roleToDelete);
        return ResponseEntity.ok().body(role);
    }
}
