package com.enterprise.cartservice.kafka;

import com.enterprise.cartservice.event.CartItemAddedEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class CartEventProducer {

    private static final String TOPIC_NAME = "cart-item-added";

    private final KafkaTemplate<String, CartItemAddedEvent> kafkaTemplate;

    public CartEventProducer(
            KafkaTemplate<String, CartItemAddedEvent> kafkaTemplate
    ) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishCartItemAddedEvent(
            CartItemAddedEvent event
    ) {
        kafkaTemplate.send(
                TOPIC_NAME,
                String.valueOf(event.getCartId()),
                event
        );
    }
}