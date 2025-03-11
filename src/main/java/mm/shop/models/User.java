package mm.shop.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;


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
    @Column(name="email", unique = true)
    @NotNull
    @NotEmpty
    private String email;

    @Column(name="username", unique = true)
    @NotNull
    @NotEmpty
    private String username;

    @Column(name="password")
    @NotNull
    @NotEmpty
    private String password;

    @Column(name="role")
    @NotNull
    @NotEmpty
    private String role="user"; //user, admin

    public User(String username,String password, String email) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

}
