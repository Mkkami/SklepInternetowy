package mm.shop.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="roles")
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="name", nullable = false)
    @NotNull
    @NotEmpty
    private String name;
}
