package mm.shop.DTO;


import mm.shop.models.Role;

import java.util.Collection;

public record UserDTO(
        long id,
        String email,
        String name,
        String surname,
        Collection<Role> roles)
{}
