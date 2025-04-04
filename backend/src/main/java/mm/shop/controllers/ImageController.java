package mm.shop.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ImageController {

    @PostMapping("/image/upload")
    public ResponseEntity<String> uploadImage() {
        // Logic to handle image upload
        return ResponseEntity.ok("Image uploaded successfully");
    }

}
