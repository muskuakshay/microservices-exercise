package com.enterprise.productservice.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class CartEventConsumer {

    private static final Logger log =
            LoggerFactory.getLogger(CartEventConsumer.class);

    @KafkaListener(
            topics = "cart-item-added",
            groupId = "product-service-group"
    )
    public void consumeCartItemAddedEvent(String event) {
        log.info("Received cart item added event: {}", event);
    }
}