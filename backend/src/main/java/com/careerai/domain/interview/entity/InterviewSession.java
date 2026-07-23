package com.careerai.domain.interview.entity;

import com.careerai.domain.shared.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "interview_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSession extends BaseEntity {

    private UUID userId;
    private UUID jobId;
    private String title;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String stack;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Integer totalQuestions;
    private Double averageScore;
    
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;

    @Transient
    @Builder.Default
    private List<Object> questions = new ArrayList<>(); // InterviewQuestion implemented later

    public enum Type {
        TECHNICAL, HR, BEHAVIORAL
    }

    public enum Difficulty {
        JUNIOR, MID, SENIOR, LEAD
    }

    public enum Status {
        SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
    }
}
