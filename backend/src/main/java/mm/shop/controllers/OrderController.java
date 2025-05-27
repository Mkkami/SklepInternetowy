package mm.shop.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mm.shop.DTO.OrderRequest;
import mm.shop.models.Order;
import mm.shop.models.User;
import mm.shop.repositories.ProductRepository;
import mm.shop.repositories.UserRepository;
import mm.shop.services.OrderService;
import mm.shop.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;


    @PostMapping("/create")
    public ResponseEntity<?> createOrder(OrderRequest orderRequest, Principal principal) {
        String email = principal.getName();
        log.info("Creating order for user: " + email);

        User user = userService.findByEmailRaw(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order savedOrder = orderService.createOrder(orderRequest, user);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/history")
    public ResponseEntity<?> getOrderHistory(Principal principal) {
        String email = principal.getName();
        log.info("Fetching order history for user: " + email);

        User user = userService.findByEmailRaw(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(orderService.getOrderHistory(user));
    }


}
