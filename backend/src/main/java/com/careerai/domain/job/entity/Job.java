package com.careerai.domain.job.entity;

import com.careerai.domain.shared.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job extends BaseEntity {

    private UUID userId;
    private String company;
    private String title;
    private String location;

    @Enumerated(EnumType.STRING)
    private WorkMode workMode;

    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String description;
    private String requirements;
    private String benefits;

    @Enumerated(EnumType.STRING)
    private Source source;

    private String sourceUrl;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "jobId", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<JobTechnology> technologies = new ArrayList<>();

    public enum WorkMode {
        REMOTE, HYBRID, ONSITE
    }

    public enum Source {
        LINKEDIN, INDEED, COMPANY_WEBSITE, OTHER
    }

    public enum Status {
        OPEN, CLOSED, DRAFT
    }
}
