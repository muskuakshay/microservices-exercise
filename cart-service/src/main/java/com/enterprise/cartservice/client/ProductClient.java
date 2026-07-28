package com.enterprise.cartservice.client;

import com.enterprise.cartservice.dto.ProductResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class ProductClient {

    private final WebClient productWebClient;

    public ProductClient(WebClient productWebClient) {
        this.productWebClient = productWebClient;
    }

    public ProductResponse getProductById(Integer productId) {
        return productWebClient
                .get()
                .uri("/api/products/{id}", productId)
                .retrieve()
                .bodyToMono(ProductResponse.class)
                .block();
    }
}