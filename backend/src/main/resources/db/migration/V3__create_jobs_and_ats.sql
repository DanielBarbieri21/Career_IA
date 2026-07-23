-- V3: Jobs & ATS
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    company VARCHAR(200) NOT NULL,
    title VARCHAR(200) NOT NULL,
    location VARCHAR(200),
    work_mode VARCHAR(20),
    salary_min DECIMAL(12,2),
    salary_max DECIMAL(12,2),
    currency VARCHAR(5) DEFAULT 'BRL',
    description TEXT,
    requirements TEXT,
    benefits TEXT,
    source VARCHAR(30) NOT NULL DEFAULT 'MANUAL',
    source_url VARCHAR(1000),
    status VARCHAR(20) NOT NULL DEFAULT 'SAVED',
    imported_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT DEFAULT 0,
    CONSTRAINT fk_jobs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_job_work_mode CHECK (work_mode IN ('REMOTE','HYBRID','ONSITE', NULL)),
    CONSTRAINT chk_job_source CHECK (source IN ('LINKEDIN','GUPY','WORKDAY','GREENHOUSE','LEVER','INDEED','GLASSDOOR','WELLFOUND','REMOTEOK','PROGRAMATHOR','GEEK_HUNTER','MANUAL','URL')),
    CONSTRAINT chk_job_status CHECK (status IN ('SAVED','ANALYZING','READY'))
);

CREATE TABLE job_technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(30),
    required BOOLEAN NOT NULL DEFAULT false,
    level VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_tech_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT chk_tech_category CHECK (category IN ('LANGUAGE','FRAMEWORK','DATABASE','CLOUD','TOOL','METHODOLOGY','SOFT_SKILL', NULL))
);

-- pgvector para busca semântica de vagas
CREATE TABLE job_embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL UNIQUE,
    embedding vector(1536),
    model VARCHAR(50) DEFAULT 'text-embedding-3-small',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_job_embeddings FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- ATS Analysis
CREATE TABLE ats_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    resume_id UUID NOT NULL,
    job_id UUID,
    overall_score INT NOT NULL DEFAULT 0,
    analysis_summary TEXT,
    suggestions TEXT,
    analyzed_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT DEFAULT 0,
    CONSTRAINT fk_ats_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_ats_resume FOREIGN KEY (resume_id) REFERENCES resumes(id),
    CONSTRAINT fk_ats_job FOREIGN KEY (job_id) REFERENCES jobs(id)
);

CREATE TABLE ats_skill_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ats_report_id UUID NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    category VARCHAR(30),
    score INT NOT NULL DEFAULT 0,
    found_in_resume BOOLEAN NOT NULL DEFAULT false,
    found_in_job BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_skill_scores_report FOREIGN KEY (ats_report_id) REFERENCES ats_reports(id) ON DELETE CASCADE
);

CREATE INDEX idx_jobs_user ON jobs(user_id);
CREATE INDEX idx_jobs_status ON jobs(user_id, status);
CREATE INDEX idx_job_tech_job ON job_technologies(job_id);
CREATE INDEX idx_job_embeddings ON job_embeddings USING hnsw (embedding vector_cosine_ops);
