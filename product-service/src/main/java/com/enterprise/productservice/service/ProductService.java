package com.enterprise.productservice.service;

import com.enterprise.productservice.entity.Product;
import com.enterprise.productservice.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product createProduct(Product product) {
        validateProduct(product);
        return productRepository.save(product);
    }

    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product updateProduct(Integer id, Product updatedProduct) {
        validateProduct(updatedProduct);

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Product not found with id: " + id
                        )
                );

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStock(updatedProduct.getStock());

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Integer id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Product not found with id: " + id
            );
        }

        productRepository.deleteById(id);
    }

    public boolean hasSufficientStock(Integer productId, Integer quantity) {
        if (quantity == null || quantity <= 0) {
            return false;
        }

        return productRepository.findById(productId)
                .map(product -> product.getStock() >= quantity)
                .orElse(false);
    }

    private void validateProduct(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null");
        }

        if (product.getName() == null || product.getName().isBlank()) {
            throw new IllegalArgumentException(
                    "Product name cannot be empty"
            );
        }

        if (product.getPrice() == null
                || product.getPrice().signum() < 0) {
            throw new IllegalArgumentException(
                    "Product price cannot be negative"
            );
        }

        if (product.getStock() == null || product.getStock() < 0) {
            throw new IllegalArgumentException(
                    "Product stock cannot be negative"
            );
        }
    }
}