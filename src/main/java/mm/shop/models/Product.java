package mm.shop.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    @NotNull
    @NotEmpty
    private String name;

    @Column(name = "price")
    @NotNull
    private double price;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "image")
    private String imageUrl;

    @Column(name = "category")
    private String category;

    @Column(name = "stock")
    @NotNull
    private int stock;
}
