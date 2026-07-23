package com.careerai.domain.resume.entity;

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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "resumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume extends BaseEntity {

    private UUID userId;
    private String title;
    private String originalFileName;

    @Enumerated(EnumType.STRING)
    private FileType fileType;

    private String parsedText;
    private Integer currentVersion;
    private String template;
    private boolean isActive;

    @OneToMany(mappedBy = "resumeId", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ResumeSection> sections = new ArrayList<>();

    public enum FileType {
        PDF, DOCX, TXT
    }
}
