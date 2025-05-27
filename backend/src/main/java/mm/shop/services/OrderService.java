package mm.shop.services;

import lombok.RequiredArgsConstructor;
import mm.shop.DTO.OrderItemRequest;
import mm.shop.DTO.OrderRequest;
import mm.shop.models.Order;
import mm.shop.models.OrderItem;
import mm.shop.models.User;
import mm.shop.repositories.OrderItemRepository;
import mm.shop.repositories.OrderRepository;
import mm.shop.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    //after payment
    public Order createOrder(OrderRequest orderRequest, User user) {
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> items = new ArrayList<>();
        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found")));
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(orderItem.getProduct().getPrice());
            orderItem.setOrder(order);
            items.add(orderItem);
        }

        order.setItems(items);
        order.setUser(user);
        Order savedOrder = orderRepository.save(order);
        return savedOrder;
    }

    public List<Order> getOrderHistory(User user) {
        return orderRepository.findByUserId(user.getId());
    }
}
