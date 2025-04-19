package mm.shop.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@RestController()
@RequestMapping("/cart")
public class CartController {

    @GetMapping()
    public String cart() {
        return "cart";
    }

    @PostMapping()
    public ResponseEntity<?> addToCart(@RequestBody CartRequest request, Principal principal) {
        String email = principal.getName();
        log.info("Adding item to cart for user: " + email);
        return ResponseEntity.ok(String.format("Item %d added to cart.", request.id));
    }
    
}
@Data
@NoArgsConstructor
@AllArgsConstructor
class CartRequest {
    long id;
    int quantity;
}