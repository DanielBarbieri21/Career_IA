package com.careerai.domain.user.entity;

import com.careerai.domain.shared.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile extends BaseEntity {

    private String headline;
    private String bio;
    private String phone;
    private String location;
    private String website;
    private String linkedinUrl;
    private String githubUrl;
    private Integer totalXp;
    private Integer level;
    private Integer currentStreak;
    private Integer longestStreak;
    private LocalDateTime lastActivityAt;
}
