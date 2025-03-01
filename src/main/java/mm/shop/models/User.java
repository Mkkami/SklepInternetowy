package mm.shop.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name="users")
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


}
