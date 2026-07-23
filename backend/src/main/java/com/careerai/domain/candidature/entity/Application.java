package com.careerai.domain.candidature.entity;

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
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application extends BaseEntity {

    private UUID userId;
    private UUID jobId;
    private UUID resumeId;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime appliedAt;
    private LocalDateTime nextStepDate;
    private String recruiterName;
    private String notes;

    @Transient
    @Builder.Default
    private List<Object> stages = new ArrayList<>(); // ApplicationStage can be implemented later

    public enum Status {
        SOURCING, APPLIED, SCREENING, INTERVIEW, TECHNICAL, OFFER, REJECTED, WITHDRAWN
    }
}
