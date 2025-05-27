package mm.shop.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mm.shop.models.Cart;
import mm.shop.services.CartService;
import mm.shop.services.StripeService;
import mm.shop.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@Slf4j
@RequestMapping("/payment")
public class PaymentController {

    private final StripeService stripeService;
    private final CartService cartService;

    public PaymentController(StripeService stripeService, UserService userService, CartService cartService) {
        this.stripeService = stripeService;
        this.cartService = cartService;
    }

    @Transactional
    @PostMapping("/create-payment-intent")
    public ResponseEntity<String> createPaymentIntent(Principal principal) {
        String email = principal.getName();
        log.info("Creating payment intent for user: " + email);
        Cart cart = cartService.getCartByUserEmail(email);
        try {
            PaymentIntent paymentIntent = stripeService.createPaymentIntent(cart);
            return ResponseEntity.ok(paymentIntent.getClientSecret());
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
