package mm.shop.services;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mm.shop.models.Product;
import mm.shop.repositories.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ProductService {
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

    public String uploadImage(Long id, MultipartFile file) {
        Product product = getProductById(id);
        String imageUrl = imageFunc.apply(id, file);
        product.setImageUrl(imageUrl);
        productRepo.save(product);

        return imageUrl;
    }

    private final Function<String, String> fileExtension = (filename) -> {
        return Optional.of(filename).filter(name -> name.contains("."))
                .map(name -> "." + name.substring(filename.indexOf(".")+1)).orElse(".png");
    };

    private final BiFunction<Long, MultipartFile, String> imageFunc = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileLocation = Paths.get("").toAbsolutePath().normalize();

            if (!Files.exists(fileLocation)) {
                Files.createDirectories(fileLocation);
            }

            Files.copy(image.getInputStream(), fileLocation.resolve(
                    id+fileExtension.apply(image.getOriginalFilename())), REPLACE_EXISTING);

            return String.valueOf(ServletUriComponentsBuilder.fromCurrentContextPath().path("/products/image/" + filename));
        } catch (Exception ex) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
