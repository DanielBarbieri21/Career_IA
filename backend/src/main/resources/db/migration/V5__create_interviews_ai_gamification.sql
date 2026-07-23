-- V5: Interviews, AI Generations, Notifications, Gamification
CREATE TABLE interview_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    job_id UUID,
    title VARCHAR(200) NOT NULL,
    type VARCHAR(30) NOT NULL DEFAULT 'TECHNICAL',
    stack VARCHAR(200),
    difficulty VARCHAR(20) NOT NULL DEFAULT 'MID',
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS',
    total_questions INT NOT NULL DEFAULT 10,
    answered_questions INT NOT NULL DEFAULT 0,
    average_score DECIMAL(5,2),
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT DEFAULT 0,
    CONSTRAINT fk_interview_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_interview_job FOREIGN KEY (job_id) REFERENCES jobs(id),
    CONSTRAINT chk_interview_type CHECK (type IN ('TECHNICAL','HR','STAR','SYSTEM_DESIGN','BEHAVIORAL')),
    CONSTRAINT chk_interview_difficulty CHECK (difficulty IN ('JUNIOR','MID','SENIOR','STAFF')),
    CONSTRAINT chk_interview_status CHECK (status IN ('IN_PROGRESS','COMPLETED','ABANDONED'))
);

CREATE TABLE interview_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL,
    question TEXT NOT NULL,
    category VARCHAR(50),
    expected_answer TEXT,
    user_answer TEXT,
    score INT,
    feedback TEXT,
    time_spent_seconds INT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_questions_session FOREIGN KEY (session_id) REFERENCES interview_sessions(id) ON DELETE CASCADE
);

-- AI Generations history
CREATE TABLE ai_generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL,
    provider VARCHAR(20) NOT NULL DEFAULT 'openai',
    model VARCHAR(50),
    prompt_summary VARCHAR(500),
    output TEXT NOT NULL,
    tokens_used INT,
    job_id UUID,
    resume_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_ai_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'INFO',
    channel VARCHAR(20) NOT NULL DEFAULT 'IN_APP',
    is_read BOOLEAN NOT NULL DEFAULT false,
    read_at TIMESTAMP,
    reference_id UUID,
    reference_type VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_notif_type CHECK (type IN ('INFO','SUCCESS','WARNING','ERROR')),
    CONSTRAINT chk_notif_channel CHECK (channel IN ('EMAIL','PUSH','IN_APP'))
);

-- Gamification
CREATE TABLE user_xp_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,
    xp_earned INT NOT NULL DEFAULT 0,
    description VARCHAR(255),
    reference VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_xp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    badge_key VARCHAR(50) NOT NULL,
    badge_name VARCHAR(100) NOT NULL,
    badge_description TEXT,
    badge_icon VARCHAR(50),
    earned_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_badge_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_badge UNIQUE (user_id, badge_key)
);

-- Roadmap
CREATE TABLE roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE,
    title VARCHAR(200) DEFAULT 'Meu Plano de Estudos',
    generated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_roadmap_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE roadmap_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    roadmap_id UUID NOT NULL,
    technology VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    status VARCHAR(20) DEFAULT 'TODO',
    resources JSONB,
    order_index INT NOT NULL DEFAULT 0,
    estimated_hours INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_items_roadmap FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE
);

-- Audit Log
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    occurred_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Domain Events Outbox
CREATE TABLE domain_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL,
    aggregate_id VARCHAR(255) NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    occurred_at TIMESTAMP NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMP,
    retry_count INT NOT NULL DEFAULT 0,
    CONSTRAINT chk_event_status CHECK (status IN ('PENDING','PROCESSED','FAILED'))
);

CREATE INDEX idx_interviews_user ON interview_sessions(user_id);
CREATE INDEX idx_ai_generations_user ON ai_generations(user_id, type);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_xp_events_user ON user_xp_events(user_id);
CREATE INDEX idx_domain_events_status ON domain_events(status, occurred_at);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id, occurred_at);
