package mm.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime orderDate;

    @PrePersist
    protected void createDate() {
        if (orderDate == null) {
            orderDate = LocalDateTime.now();
        }
    }

    @Column(name = "status")
    private String status; // "PENDING", "PAID", "DELIVERED", "CANCELLED"

}

