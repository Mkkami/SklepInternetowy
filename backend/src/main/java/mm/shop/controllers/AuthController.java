package mm.shop.controllers;


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
