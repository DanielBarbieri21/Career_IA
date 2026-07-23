-- V4: Applications (CRM) & Match
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    job_id UUID,
    resume_id UUID,
    status VARCHAR(30) NOT NULL DEFAULT 'SOURCING',
    applied_at TIMESTAMP,
    next_step_date TIMESTAMP,
    recruiter_name VARCHAR(150),
    recruiter_email VARCHAR(255),
    cover_letter TEXT,
    notes TEXT,
    salary_expected DECIMAL(12,2),
    priority VARCHAR(10) DEFAULT 'MEDIUM',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT DEFAULT 0,
    CONSTRAINT fk_apps_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_apps_job FOREIGN KEY (job_id) REFERENCES jobs(id),
    CONSTRAINT fk_apps_resume FOREIGN KEY (resume_id) REFERENCES resumes(id),
    CONSTRAINT chk_app_status CHECK (status IN ('SOURCING','APPLIED','SCREENING','INTERVIEW','TECHNICAL','OFFER','REJECTED','WITHDRAWN')),
    CONSTRAINT chk_app_priority CHECK (priority IN ('LOW','MEDIUM','HIGH'))
);

CREATE TABLE application_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL,
    status VARCHAR(30) NOT NULL,
    notes TEXT,
    occurred_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_stages_app FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

CREATE TABLE application_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    CONSTRAINT fk_notes_app FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- Match Engine
CREATE TABLE match_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    resume_id UUID NOT NULL,
    job_id UUID NOT NULL,
    overall_score INT NOT NULL DEFAULT 0,
    ats_score INT NOT NULL DEFAULT 0,
    hr_score INT NOT NULL DEFAULT 0,
    technical_score INT NOT NULL DEFAULT 0,
    final_score INT NOT NULL DEFAULT 0,
    gap_analysis JSONB,
    recommendations JSONB,
    estimated_salary DECIMAL(12,2),
    seniority VARCHAR(50),
    time_to_eligibility VARCHAR(100),
    analyzed_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT DEFAULT 0,
    CONSTRAINT fk_match_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_match_resume FOREIGN KEY (resume_id) REFERENCES resumes(id),
    CONSTRAINT fk_match_job FOREIGN KEY (job_id) REFERENCES jobs(id)
);

CREATE INDEX idx_apps_user ON applications(user_id);
CREATE INDEX idx_apps_status ON applications(user_id, status);
CREATE INDEX idx_match_user ON match_reports(user_id);
CREATE INDEX idx_match_job ON match_reports(job_id, resume_id);
