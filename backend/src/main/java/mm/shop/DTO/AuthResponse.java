package mm.shop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
}
