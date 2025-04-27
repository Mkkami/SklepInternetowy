package mm.shop.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Table(name="CartItem")
@NoArgsConstructor
//@RequiredArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;

    @ManyToOne
    @JoinColumn(name="cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;

    @Column(name="quantity")
    @NotNull
    private int quantity = 1;

    public double getTotalPrice() {
        return product.getPrice() * quantity;
    }

    public void addQuantity(int quantity) {
        this.quantity++;
    }

    public void removeQuantity(int quantity) {
        this.quantity--;
    }

    public CartItem(Cart cart, Product product) {
        this.cart = cart;
        this.product = product;
    }
}
