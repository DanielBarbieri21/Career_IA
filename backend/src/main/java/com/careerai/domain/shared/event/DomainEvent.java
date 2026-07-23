package com.careerai.domain.shared.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public abstract class DomainEvent extends ApplicationEvent {

    private final UUID eventId;
    private final LocalDateTime occurredAt;
    private final String eventType;
    private final UUID aggregateId;

    public DomainEvent(Object source, String eventType, UUID aggregateId) {
        super(source);
        this.eventId = UUID.randomUUID();
        this.occurredAt = LocalDateTime.now();
        this.eventType = eventType;
        this.aggregateId = aggregateId;
    }
}
