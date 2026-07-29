package com.enterprise.cartservice.kafka;

import com.enterprise.cartservice.event.CartItemAddedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class CartEventProducer {

    private static final Logger log =
            LoggerFactory.getLogger(CartEventProducer.class);

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
        kafkaTemplate
                .send(
                        TOPIC_NAME,
                        String.valueOf(event.getCartId()),
                        event
                )
                .whenComplete((result, exception) -> {
                    if (exception != null) {
                        log.error(
                                "Failed to publish Kafka event: {}",
                                event,
                                exception
                        );
                    } else {
                        log.info(
                                "Kafka event published successfully. Topic: {}, cartId: {}, productId: {}, quantity: {}",
                                TOPIC_NAME,
                                event.getCartId(),
                                event.getProductId(),
                                event.getQuantity()
                        );
                    }
                });
    }
}