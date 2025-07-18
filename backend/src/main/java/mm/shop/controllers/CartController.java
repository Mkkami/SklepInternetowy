package mm.shop.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mm.shop.models.Cart;
import mm.shop.models.CartItem;
import mm.shop.models.Product;
import mm.shop.services.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping()
    public ResponseEntity<?> getAllCart(Principal principal) {
        String email = principal.getName();
        log.info("Getting cart for user: " + email);
        Cart cart = cartService.getCartByUserEmail(email);

        return ResponseEntity.ok(cartService.getCartItems(cart.getId()));

    }

    @PostMapping()
    public ResponseEntity<?> addToCart(@RequestBody CartAddRequest request, Principal principal) {
        String email = principal.getName();
        log.info("Adding item to cart for user: " + email);
        Cart cart = cartService.getCartByUserEmail(email);
        log.info("Cart ID: " + cart.getId() + ", Product ID: " + request.id + ", Quantity: " + request.quantity);
        cartService.addToCart(request.id, cart.getId(), request.quantity);
        return ResponseEntity.ok(String.format("Item %d added to cart.", request.id));
    }

    @PutMapping("/item")
    public ResponseEntity<?> updateQuantity(@RequestBody CartAddRequest request, Principal principal) {
        String email = principal.getName();
        log.info("Updating item quantity in cart for user: " + email);
        log.info("Product ID: " + request.id + ", Quantity: " + request.quantity);
        Cart cart = cartService.getCartByUserEmail(email);
        cartService.updateQuantity(request.id, request.quantity);
        return ResponseEntity.ok(String.format("Item %d quantity updated to %d.", request.id, request.quantity));
    }

    @Transactional
    @DeleteMapping()
    public ResponseEntity<?> removeAllItemsFromCart(Principal principal) {
        String email = principal.getName();
        log.info("Removing all items from cart for user: " + email);
        Cart cart = cartService.getCartByUserEmail(email);
        cartService.deleteCartItems(cart.getId());
        return ResponseEntity.ok("All items removed from cart.");
    }

    @DeleteMapping("/item")
    public ResponseEntity<?> removeFromCart(@RequestBody CartAddRequest request, Principal principal) {
        String email = principal.getName();
        log.info("Removing item from cart for user: " + email);
        Cart cart = cartService.getCartByUserEmail(email);
        cartService.removeFromCart(request.id);
        return ResponseEntity.ok(String.format("Item %d removed from cart.", request.id));
    }

}
@Data
@NoArgsConstructor
@AllArgsConstructor
class CartAddRequest {
    long id;
    int quantity;
}