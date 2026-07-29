package com.enterprise.cartservice.controller;

import com.enterprise.cartservice.entity.Cart;
import com.enterprise.cartservice.entity.CartItem;
import com.enterprise.cartservice.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        Cart createdCart = cartService.createCart(cart);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdCart);
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        return ResponseEntity.ok(cartService.getAllCarts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable Integer id) {
        return cartService.getCartById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/items")
    public CompletableFuture<ResponseEntity<CartItem>> addCartItem(
            @RequestBody CartItem cartItem
    ) {
        return cartService
                .addCartItem(cartItem)
                .thenApply(createdItem ->
                        ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(createdItem)
                );
    }

    @GetMapping("/items")
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        return ResponseEntity.ok(cartService.getAllCartItems());
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteCartItem(
            @PathVariable Integer id
    ) {
        cartService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
}