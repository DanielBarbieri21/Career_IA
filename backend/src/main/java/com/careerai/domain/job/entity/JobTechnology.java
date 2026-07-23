package com.careerai.domain.job.entity;

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
@Table(name = "job_technologies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobTechnology extends BaseEntity {

    private UUID jobId;
    private String name;

    @Enumerated(EnumType.STRING)
    private Category category;

    private boolean required;
    private String level;

    public enum Category {
        LANGUAGE, FRAMEWORK, DATABASE, TOOL, CLOUD, OTHER
    }
}
