package mm.shop.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Data
@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name="name", nullable = false)
    @NotNull
    @NotEmpty
    private String name;

    @Column(name="surname", nullable = false)
    @NotNull
    @NotEmpty
    private String surname;

    @Column(name="password", nullable = false)
    @NotNull
    @NotEmpty
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Order> orders;

    public User(String name, String surname, String password, String email) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.password = password;
    }
}
