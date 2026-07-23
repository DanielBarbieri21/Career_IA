# 🚀 Career AI — Plataforma de Career Intelligence

<div align="center">
  <img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=java" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.3-green?style=for-the-badge&logo=springboot" />
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Docker-ready-blue?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/OpenAI-GPT--4o-black?style=for-the-badge&logo=openai" />
</div>

<br/>

> **Career AI** é uma plataforma SaaS inteligente completa para gerenciamento estratégico de carreira, busca e análise de vagas, compatibilidade ATS via Inteligência Artificial, personalização avançada de currículos e simulação interativa de entrevistas.

---

## 📋 Módulos da Plataforma

| # | Módulo | Descrição |
|---|--------|-----------|
| 1 | 🔐 **Auth** | OAuth2 (Google, GitHub, LinkedIn) + JWT + Refresh Token via Redis |
| 2 | 📊 **Dashboard** | Métricas em tempo real, gráficos de pipeline, nível XP e feed de atividades |
| 3 | 📄 **Currículo** | Upload PDF/DOCX, editor visual por seções, versionamento e exportação |
| 4 | 🎯 **ATS Engine** | Análise semântica de aderência ATS com pontuação detalhada por tecnologia |
| 5 | 💼 **Job Import** | Importador inteligente de vagas via URL, texto ou LinkedIn |
| 6 | ⚡ **Match Engine** | Matriz de compatibilidade (ATS, RH e Técnica) via Career Intelligence Engine |
| 7 | 🤖 **IA Generativa** | Central de IA com GPT-4o e Gemini para geração de 12+ tipos de conteúdo |
| 8 | 🎤 **Interview AI** | Simulador interativo de entrevistas com timer, perguntas por nível e feedback |
| 9 | 📋 **Career CRM** | Quadro Kanban completo de candidaturas (8 etapas de contratação) |
| 10 | 📈 **Analytics** | Relatórios visuais, taxa de conversão e exportação em CSV |
| 11 | 🔔 **Notificações** | Sistema de alertas In-App, Email e Push |
| 12 | 🐙 **Portfólio** | Sincronização automática com GitHub API |
| 13 | 💼 **LinkedIn AI** | Otimização de perfil, headline, resumos e postagens inteligentes |
| 14 | 🗺️ **Roadmap** | Plano de estudos personalizado baseado nos gaps técnicos das vagas |

---

## 🏗️ Arquitetura do Projeto

```
career-ai/
├── .github/workflows/          # CI/CD Workflows (GitHub Actions)
├── backend/                    # Java 21 + Spring Boot 3.3 (Hexagonal Architecture)
│   ├── src/main/java/com/careerai/
│   │   ├── config/             # Security, JWT, CORS, OpenAPI/Swagger, AI
│   │   ├── domain/             # Entidades de Domínio, VOs, Eventos e Portas
│   │   │   ├── user/
│   │   │   ├── resume/
│   │   │   ├── job/
│   │   │   ├── candidature/    # CRM
│   │   │   ├── match/
│   │   │   ├── interview/
│   │   │   ├── gamification/
│   │   │   └── shared/         # BaseEntity, DomainEvent, ExceptionHandler
│   │   ├── infrastructure/     # Adapters: Security, AI, Persistence
│   │   └── presentation/       # REST Controllers (/api/v1/**)
│   └── src/main/resources/
│       ├── application.yml     # Configurações centralizadas com Feature Flags
│       └── db/migration/       # Migrations Flyway (V1..V5)
│
├── frontend/                   # React 18 + TypeScript + Vite + TailwindCSS
│   ├── src/
│   │   ├── app/               # Layout, Header, Sidebar, Router, Providers
│   │   ├── modules/           # Módulos da aplicação (Dashboard, CRM, ATS, etc.)
│   │   ├── services/          # Cliente HTTP Axios + interceptors
│   │   └── shared/            # Hooks Zustand, utilitários
│   └── index.html
│
├── monitoring/                 # Prometheus & Grafana stack
├── docker-compose.yml          # Containerização completa dos serviços
├── .env.example               # Template de variáveis de ambiente
├── .gitignore                 # Filtros de versionamento Git
└── start.ps1                   # Script de inicialização automática (PowerShell)
```

---

## 🛠️ Stack Tecnológica

### Backend

- **Java 21** com Virtual Threads (Project Loom)
- **Spring Boot 3.3** (Security, Data JPA, Spring AI, Web)
- **PostgreSQL 16** com extensão **pgvector** (Embeddings & RAG)
- **Redis 7** (Cache & Gestão de Tokens)
- **RabbitMQ** (Mensageria & Event-Driven)
- **Flyway** (Gerenciamento de Schema)
- **Spring AI** (Integração OpenAI GPT-4o & Google Gemini)

### Frontend

- **React 18** + **TypeScript** + **Vite**
- **TailwindCSS** + **Shadcn UI**
- **Framer Motion** (Animações e transições)
- **Recharts** (Visualização de dados e gráficos)
- **React Query v5** + **Zustand** (Estado global e cache de dados)
- **Lucide React** (Iconografia)

---

## 🚀 Como Subir no Git / GitHub

Para subir este repositório para o seu GitHub, execute os seguintes comandos no terminal:

```bash
# 1. Inicializar o repositório Git
git init

# 2. Adicionar os arquivos ao staging
git add .

# 3. Criar o commit inicial
git commit -m "feat: initial commit - Career AI Platform MVP"

# 4. Renomear a branch para main
git branch -M main

# 5. Conectar com o seu repositório remoto no GitHub
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# 6. Enviar o código para o GitHub
git push -u origin main
```

---

## 💻 Execução Local

### Modo Rápido / Frontend Demo (Sem backend ou API Keys)

```bash
cd frontend
npm install
npm run dev
```

Acesse **<http://localhost:5173>** no navegador.

### Modo Completo (Containers + Infraestrutura)

```bash
# 1. Copiar variáveis de ambiente
cp .env.example .env

# 2. Subir os serviços com Docker
docker-compose up -d

# 3. Executar o Backend
cd backend
./mvnw spring-boot:run
```

🌐 GitHub: <https://github.com/DanielBarbieri21>  
💼 LinkedIn: <https://www.linkedin.com/in/daniel-barbieri-4990462a/>

---
