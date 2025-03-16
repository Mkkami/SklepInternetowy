package mm.shop.controllers;


import lombok.RequiredArgsConstructor;
import mm.shop.DTO.JwtResponse;
import mm.shop.DTO.LoginRequest;
import mm.shop.services.JwtService;
import mm.shop.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@RestController
//@RequestMapping("/auth")
//@RequiredArgsConstructor
//public class AuthController {
//
//    private final AuthenticationManager authenticationManager;
//    private final JwtService jwtService;
//    private final UserRepository userRepository;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
//        );
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String token = jwtService.generateToken(authentication);
//        return ResponseEntity.ok(new JwtResponse());
//    }
//}
