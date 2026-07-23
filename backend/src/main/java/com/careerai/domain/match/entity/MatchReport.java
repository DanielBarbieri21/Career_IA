package com.careerai.domain.match.entity;

import com.careerai.domain.shared.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "match_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchReport extends BaseEntity {

    private UUID userId;
    private UUID resumeId;
    private UUID jobId;
    
    private Double overallScore;
    private Double atsScore;
    private Double hrScore;
    private Double technicalScore;
    private Double finalScore;

    @Column(columnDefinition = "TEXT")
    private String gapAnalysis;
    
    @Column(columnDefinition = "TEXT")
    private String recommendations;

    private BigDecimal estimatedSalary;
    private String seniority;
}
