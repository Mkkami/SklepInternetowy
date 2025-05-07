package mm.shop.services;

import lombok.RequiredArgsConstructor;
import mm.shop.DTO.CartItemDTO;
import mm.shop.models.Cart;
import mm.shop.models.CartItem;
import mm.shop.models.Product;
import mm.shop.repositories.CartItemRepository;
import mm.shop.repositories.CartRepository;
import mm.shop.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    public Cart addToCart(Long productId, Long cartId, int quantity) {
       Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
       Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));


        // Check if the product is already in the cart
        if (cartItemRepository.findByProductIdAndCartId(productId, cartId).isPresent()) {
            throw new RuntimeException("Product already in cart");
        }

        CartItem cartItem = new CartItem(cart, product);
        cartItem.setQuantity(quantity);

        // Add the product to the cart
        cartItemRepository.save(cartItem);
        Cart updatedCart = cartRepository.findById(cart.getId()).orElseThrow();
        return updatedCart;
    }

    public void removeFromCart(Long productId, Long cartId) {
        // Check if the product exists
        if (!productRepository.existsById(productId)) {
            throw new RuntimeException("Product not found");
        }

        // Check if the cart exists
        if (!cartRepository.existsById(cartId)) {
            throw new RuntimeException("Cart not found");
        }

        // Remove the product from the cart
        cartItemRepository.deleteByProductIdAndCartId(productId, cartId);
    }

    @Transactional(readOnly = true)
    public List<CartItemDTO> getCartItems(Long cartId) {
        // Check if the cart exists
        if (!cartRepository.existsById(cartId)) {
            throw new RuntimeException("Cart not found");
        }

        // Get the items in the cart
        List<CartItemDTO> items = new ArrayList<>();
        List<CartItem> cartItems = cartItemRepository.findByCartId(cartId);
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            CartItemDTO cartItemDTO = new CartItemDTO();
            cartItemDTO.setCartItem(cartItem);
            cartItemDTO.setProduct(product);
            items.add(cartItemDTO);
        }

        return items;
    }


    public Cart getCartByUserEmail(String email) {
        Cart cart = cartRepository.findByUserEmail(email);
        if (cart == null) {
            throw new RuntimeException("Cart not found");
        }
        return cart;
    }
}
