package mm.shop.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mm.shop.models.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class StripeService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public void createProduct(Product product) throws StripeException {
        ProductCreateParams createParams = ProductCreateParams.builder()
                .setName(product.getName())
                .setDescription(product.getDescription())
                .build();

        com.stripe.model.Product stripeProduct = com.stripe.model.Product.create(createParams);
        log.info("Product created: " + stripeProduct.getId());

        PriceCreateParams priceParams = PriceCreateParams.builder()
                .setProduct(stripeProduct.getId())
                .setCurrency("pln")
                .setUnitAmount((long) (product.getPrice() * 100))
                .build();
        com.stripe.model.Price stripePrice = com.stripe.model.Price.create(priceParams);
        log.info("Price created: " + stripePrice.getId());

        product.setStripeProductId(stripeProduct.getId());
        product.setStripePriceId(stripePrice.getId());
    }

    public void removeProduct(Product product) {
        try {
            com.stripe.model.Product stripeProduct = com.stripe.model.Product.retrieve(product.getStripeProductId());

            Map<String, Object> updateParams = new HashMap<>();
            updateParams.put("active", false);

            stripeProduct.update(updateParams);
            log.info("Stripe product deactivated: " + stripeProduct.getId());

        } catch (StripeException e) {
            log.error("Error deactivating Stripe product: " + e.getMessage());
        }
    }



}
