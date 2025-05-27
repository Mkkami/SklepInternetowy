package mm.shop.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import mm.shop.models.Product;
import mm.shop.services.ProductService;
import mm.shop.services.StripeService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    private final StripeService stripeService;

    public ProductController(ProductService productService, StripeService stripeService) {
        this.productService = productService;
        this.stripeService = stripeService;
    }

    @GetMapping("/products/{page}")
    public ResponseEntity<List<Product>> getAllProducts(@PathVariable int page) {

        List<Product> productList = productService.getAllProducts(page, 20).getContent();
        return ResponseEntity.ok(productList);
    }

    @PostMapping("/product/create")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        product.setImage(null);
        product.setImageMimeType(null);
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @PostMapping("/product/createNew")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> createProduct(
            @RequestPart("product") String productJson,
            @RequestPart("file") MultipartFile file
        ) throws JsonProcessingException {

        Product product = new ObjectMapper().readValue(productJson, Product.class);
        if (!List.of("image/jpeg", "image/png", "image/gif", "image/jpg").contains(file.getContentType())) {
            return ResponseEntity.badRequest().body("Dozwolone tylko typy obrazów: JPEG, PNG, GIF, JPG");
        }
        try {
            product.setImage(file.getBytes());
            product.setImageMimeType(file.getContentType());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Błąd podczas zapisu pliku");
        }
        try {
            stripeService.createProduct(product);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Błąd podczas tworzenia produktu w Stripe: " + e.getMessage());
        }

        productService.createProduct(product);
        return ResponseEntity.ok("Produkt został dodany pomyślnie");
    }

    @PostMapping("/product/{id}/image")
    public ResponseEntity<String> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        if (!List.of("image/jpeg", "image/png", "image/gif", "image/jpg").contains(file.getContentType())) {
            return ResponseEntity.badRequest().body("Dozwolone tylko typy obrazów: JPEG, PNG, GIF, JPG");
        }
        productService.uploadImage(id, file);
        return ResponseEntity.ok("Obraz został przesłany pomyślnie");
    }

    @GetMapping("/product/{id}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(product.getImageMimeType()))
                .body(product.getImage());
    }

    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        stripeService.removeProduct(product);
        productService.deleteProduct(product);
        return ResponseEntity.ok("Produkt został usunięty pomyślnie");
    }
}
