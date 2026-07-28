package com.enterprise.cartservice.service;

import com.enterprise.cartservice.client.ProductClient;
import com.enterprise.cartservice.dto.ProductResponse;
import com.enterprise.cartservice.entity.Cart;
import com.enterprise.cartservice.entity.CartItem;
import com.enterprise.cartservice.event.CartItemAddedEvent;
import com.enterprise.cartservice.kafka.CartEventProducer;
import com.enterprise.cartservice.repository.CartItemRepository;
import com.enterprise.cartservice.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductClient productClient;
    private final CartEventProducer cartEventProducer;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductClient productClient,
            CartEventProducer cartEventProducer
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productClient = productClient;
        this.cartEventProducer = cartEventProducer;
    }

    public Cart createCart(Cart cart) {
        if (cart == null) {
            throw new IllegalArgumentException("Cart cannot be null");
        }

        if (cart.getUserId() == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        return cartRepository.save(cart);
    }

    public Optional<Cart> getCartById(Integer id) {
        return cartRepository.findById(id);
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public CartItem addCartItem(CartItem cartItem) {
        validateCartItem(cartItem);

        if (!cartRepository.existsById(cartItem.getCartId())) {
            throw new IllegalArgumentException(
                    "Cart not found with id: " + cartItem.getCartId()
            );
        }

        ProductResponse product =
                productClient.getProductById(cartItem.getProductId());

        if (product == null) {
            throw new IllegalArgumentException(
                    "Product not found with id: " + cartItem.getProductId()
            );
        }

        if (product.getStock() == null
                || product.getStock() < cartItem.getQuantity()) {
            throw new IllegalArgumentException(
                    "Insufficient stock for product id: "
                            + cartItem.getProductId()
            );
        }

        CartItem savedCartItem = cartItemRepository.save(cartItem);

        CartItemAddedEvent event = new CartItemAddedEvent(
                savedCartItem.getCartId(),
                savedCartItem.getProductId(),
                savedCartItem.getQuantity()
        );

        cartEventProducer.publishCartItemAddedEvent(event);

        return savedCartItem;
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public void deleteCartItem(Integer id) {
        if (!cartItemRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Cart item not found with id: " + id
            );
        }

        cartItemRepository.deleteById(id);
    }

    private void validateCartItem(CartItem cartItem) {
        if (cartItem == null) {
            throw new IllegalArgumentException("Cart item cannot be null");
        }

        if (cartItem.getCartId() == null) {
            throw new IllegalArgumentException("Cart ID cannot be null");
        }

        if (cartItem.getProductId() == null) {
            throw new IllegalArgumentException("Product ID cannot be null");
        }

        if (cartItem.getQuantity() == null || cartItem.getQuantity() <= 0) {
            throw new IllegalArgumentException(
                    "Quantity must be greater than zero"
            );
        }
    }
}