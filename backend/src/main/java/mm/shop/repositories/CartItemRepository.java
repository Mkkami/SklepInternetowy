package mm.shop.repositories;

import mm.shop.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByProductIdAndCartId(Long productId, Long cartId);

    List<CartItem> findByCartId(Long cartId);

    void deleteByProductIdAndCartId(Long productId, Long cartId);

    void deleteById(Long id);
}
