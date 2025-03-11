package mm.shop.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;


@Data
@Entity
@Table(name="users")
@NoArgsConstructor
public class User {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Email
    @Column(name="email", unique = true, nullable = false)
    @NotNull
    @NotEmpty
    private String email;

    @Column(name="username", unique = true, nullable = false)
    @NotNull
    @NotEmpty
    private String username;

    @Column(name="password", nullable = false)
    @NotNull
    @NotEmpty
    private String password;

    @Column(name="role", nullable = false)
    @NotNull
    @NotEmpty
    private String role="user"; //user, admin

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Order> orders;

    public User(String username,String password, String email) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
