package mm.shop.models;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@Entity
@Table(name="cart")
@NoArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;

    // Every user has one cart
    @OneToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

        // CASCADE ALL - deleting cart will result in the deletion of every CartItem
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<CartItem> items;
}
