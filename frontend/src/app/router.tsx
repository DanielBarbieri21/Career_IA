import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layout/Layout';

// ─── Lazy imports das páginas reais ──────────────────────────────
const LoginPage = lazy(() => import('../modules/auth/pages/LoginPage'));
const DashboardPage = lazy(() => import('../modules/dashboard/pages/DashboardPage'));
const CrmPage = lazy(() => import('../modules/crm/pages/CrmPage'));
const AtsPage = lazy(() => import('../modules/ats/pages/AtsPage'));
const MatchPage = lazy(() => import('../modules/match/pages/MatchPage'));
const AiHubPage = lazy(() => import('../modules/ai/pages/AiHubPage'));
const InterviewPage = lazy(() => import('../modules/interview/pages/InterviewPage'));
const JobsPage = lazy(() => import('../modules/jobs/pages/JobsPage'));
const RoadmapPage = lazy(() => import('../modules/roadmap/pages/RoadmapPage'));
const AnalyticsPage = lazy(() => import('../modules/analytics/pages/AnalyticsPage'));

// Páginas ainda não criadas — placeholders temporários
const ResumePage = lazy(() => Promise.resolve({
  default: () => (
    <div className="flex items-center justify-center h-full flex-col gap-4">
      <div className="text-6xl">📄</div>
      <h2 className="text-white text-2xl font-bold">Gerenciador de Currículos</h2>
      <p className="text-zinc-400">Em desenvolvimento — Upload, editor e versionamento</p>
    </div>
  )
}));
const PortfolioPage = lazy(() => Promise.resolve({
  default: () => (
    <div className="flex items-center justify-center h-full flex-col gap-4">
      <div className="text-6xl">🐙</div>
      <h2 className="text-white text-2xl font-bold">Portfolio GitHub</h2>
      <p className="text-zinc-400">Em desenvolvimento — Integração com GitHub API</p>
    </div>
  )
}));
const LinkedInAiPage = lazy(() => Promise.resolve({
  default: () => (
    <div className="flex items-center justify-center h-full flex-col gap-4">
      <div className="text-6xl">💼</div>
      <h2 className="text-white text-2xl font-bold">LinkedIn AI</h2>
      <p className="text-zinc-400">Em desenvolvimento — Gerador de headline, about, posts</p>
    </div>
  )
}));
const NotificationsPage = lazy(() => Promise.resolve({
  default: () => (
    <div className="flex items-center justify-center h-full flex-col gap-4">
      <div className="text-6xl">🔔</div>
      <h2 className="text-white text-2xl font-bold">Notificações</h2>
      <p className="text-zinc-400">Em desenvolvimento</p>
    </div>
  )
}));
const ProfilePage = lazy(() => Promise.resolve({
  default: () => (
    <div className="flex items-center justify-center h-full flex-col gap-4">
      <div className="text-6xl">👤</div>
      <h2 className="text-white text-2xl font-bold">Perfil</h2>
      <p className="text-zinc-400">Em desenvolvimento</p>
    </div>
  )
}));

const NotFoundPage = () => (
  <div className="flex items-center justify-center h-full flex-col gap-4">
    <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">404</div>
    <p className="text-zinc-400 text-lg">Página não encontrada</p>
  </div>
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// ─── Em MODO DEMO: usuário sempre autenticado ─────────────────────
// Remove a proteção de rota para visualizar sem backend
export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Redireciona / para /dashboard diretamente (demo) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Layout principal com todas as páginas */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/resumes" element={<ResumePage />} />
          <Route path="/ats" element={<AtsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/ai" element={<AiHubPage />} />
          <Route path="/interviews" element={<InterviewPage />} />
          <Route path="/crm" element={<CrmPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/linkedin-ai" element={<LinkedInAiPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
