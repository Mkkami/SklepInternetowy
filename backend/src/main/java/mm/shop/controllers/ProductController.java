package mm.shop.controllers;

import mm.shop.models.Product;
import mm.shop.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private static final String IMAGE_URL = "src/main/resources/static/images/";

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products/{page}")
    public ResponseEntity<List<Product>> getAllProducts(@PathVariable int page) {
        // Logic to fetch all products
        List<Product> productList = productService.getAllProducts(page, 20).getContent();
        return ResponseEntity.ok(productList);
    }

    @PostMapping("/product/create")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        // Logic to create a new product
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @PostMapping("/product/{id}/image")
    public ResponseEntity<String> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        // Logic to upload an image for a product
        String imageUrl = productService.uploadImage(id, file);
        return ResponseEntity.ok(imageUrl);
    }
}
