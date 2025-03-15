package mm.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name="orders")
@NoArgsConstructor
//@RequiredArgsConstructor
public class Order {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;


    @ManyToMany
    @JoinTable(
            name="order_products",
            joinColumns = @JoinColumn(name="order_id"),
            inverseJoinColumns = @JoinColumn(name="product_id")
    )
    @ToString.Exclude
    private List<Product> product;


    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @PrePersist
    protected void createDate() {
        orderDate = new Date();
    }
}
