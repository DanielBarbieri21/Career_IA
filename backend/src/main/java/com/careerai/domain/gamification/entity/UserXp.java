package com.careerai.domain.gamification.entity;

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

import java.util.UUID;

@Entity
@Table(name = "user_xp")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserXp extends BaseEntity {

    private UUID userId;

    @Enumerated(EnumType.STRING)
    private Action action;

    private Integer xpEarned;
    private String description;
    private String reference;

    public enum Action {
        LOGIN, APPLY_JOB, COMPLETE_INTERVIEW, UPDATE_RESUME
    }
}
