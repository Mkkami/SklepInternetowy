package mm.shop.repositories;

import mm.shop.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    Cart findByUserEmail(String email);

//    void deleteByProductIdAndUserId(Long productId, Long userId);

//    void deleteByProductIdAndCartId(Long productId, Long cartId);
}
