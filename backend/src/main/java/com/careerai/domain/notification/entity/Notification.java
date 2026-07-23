package com.careerai.domain.notification.entity;

import com.careerai.domain.shared.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification extends BaseEntity {

    private UUID userId;
    private String title;
    private String message;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    private Channel channel;

    private boolean isRead;
    private LocalDateTime readAt;
    private String referenceId;
    private String referenceType;

    public enum Type {
        INFO, SUCCESS, WARNING, ERROR
    }

    public enum Channel {
        EMAIL, PUSH, IN_APP
    }
}
