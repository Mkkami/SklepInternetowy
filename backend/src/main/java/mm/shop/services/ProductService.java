package mm.shop.services;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mm.shop.models.Product;
import mm.shop.repositories.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentContextPath;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ProductService {
    private static final long MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB limit
    private final ProductRepository productRepo;

    public Page<Product> getAllProducts(int page, int size) {
        return productRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public Product getProductById(Long id) {
        return productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found."));
    }

    public Product createProduct(Product product) {
        return productRepo.save(product);
    }

    public void deleteProduct(Product product) {
        productRepo.delete(product);
    }

    public void uploadImage(Long id, MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }
        if (file.getSize() > MAX_IMAGE_SIZE) {
            throw new RuntimeException("File size exceeds limit of 1MB");
        }

        Product product = getProductById(id);
        try {
            product.setImage(file.getBytes());
            product.setImageMimeType(file.getContentType());
            productRepo.save(product);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image data", e);
        }
    }
}