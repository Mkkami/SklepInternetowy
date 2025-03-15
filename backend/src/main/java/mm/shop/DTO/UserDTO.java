package mm.shop.DTO;


public record UserDTO(
        long id,
        String email,
        String name,
        String surname,
        String role)
{}
