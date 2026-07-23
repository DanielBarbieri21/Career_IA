-- V2: Resumes
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title VARCHAR(200) NOT NULL,
    original_file_name VARCHAR(255),
    file_type VARCHAR(10),
    file_content BYTEA,
    parsed_text TEXT,
    current_version INT NOT NULL DEFAULT 1,
    template VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT DEFAULT 0,
    CONSTRAINT fk_resumes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_resume_file_type CHECK (file_type IN ('PDF', 'DOCX', NULL))
);

CREATE TABLE resume_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID NOT NULL,
    version_number INT NOT NULL,
    title VARCHAR(200),
    content TEXT,
    template VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT DEFAULT 0,
    CONSTRAINT fk_versions_resume FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    CONSTRAINT uq_resume_version UNIQUE (resume_id, version_number)
);

CREATE TABLE resume_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID NOT NULL,
    type VARCHAR(30) NOT NULL,
    title VARCHAR(100),
    content TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT DEFAULT 0,
    CONSTRAINT fk_sections_resume FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    CONSTRAINT chk_section_type CHECK (type IN (
        'SUMMARY','EXPERIENCE','EDUCATION','SKILLS','PROJECTS','CERTIFICATIONS','LANGUAGES','CUSTOM'
    ))
);

-- pgvector para embeddings de currículos
CREATE TABLE resume_embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID NOT NULL UNIQUE,
    embedding vector(1536),
    model VARCHAR(50) DEFAULT 'text-embedding-3-small',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_embeddings_resume FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

CREATE INDEX idx_resumes_user ON resumes(user_id);
CREATE INDEX idx_resumes_active ON resumes(user_id, is_active);
CREATE INDEX idx_resume_embeddings ON resume_embeddings USING hnsw (embedding vector_cosine_ops);
