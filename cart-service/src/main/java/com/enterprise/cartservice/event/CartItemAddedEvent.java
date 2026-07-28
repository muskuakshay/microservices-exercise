package com.enterprise.cartservice.event;

public class CartItemAddedEvent {

    private Integer cartId;
    private Integer productId;
    private Integer quantity;

    public CartItemAddedEvent() {
    }

    public CartItemAddedEvent(
            Integer cartId,
            Integer productId,
            Integer quantity
    ) {
        this.cartId = cartId;
        this.productId = productId;
        this.quantity = quantity;
    }

    public Integer getCartId() {
        return cartId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}