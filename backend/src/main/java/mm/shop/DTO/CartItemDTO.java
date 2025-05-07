package mm.shop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mm.shop.models.CartItem;
import mm.shop.models.Product;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    private Long id;
    private int quantity;
    private String name;
    private double price;
    private byte[] image;
    private String mimeType;

    public void setCartItem(CartItem cartItem) {
        this.id = cartItem.getId();
        this.quantity = cartItem.getQuantity();
    }

    public void setProduct(Product product) {
        this.name = product.getName();
        this.price = product.getPrice();
        this.image = product.getImage();
        this.mimeType = product.getImageMimeType();
    }
}
