package mm.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name="orders")
@NoArgsConstructor
@RequiredArgsConstructor
public class Order {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;


//  TODO - handling many products
//    @ManyToMany
//    @JoinColumn(name="product_id")
//    private List<Product> product;


    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @PrePersist
    @PreUpdate
    protected void createDate() {
        orderDate = new Date();
    }
}
