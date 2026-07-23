import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, CheckCircle, XCircle, Calendar, Star, TrendingUp,
  Zap, Target, MessageSquare, Award, ArrowUpRight, Plus,
  Clock, Activity, BarChart3, Sparkles
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// ─── Types ───────────────────────────────────────────────────────
interface MetricCard {
  label: string;
  value: number | string;
  change: number;
  icon: React.ElementType;
  color: string;
  bg: string;
}

// ─── Mock Data ────────────────────────────────────────────────────
const applicationTimeline = [
  { month: 'Jan', applications: 4, interviews: 1, offers: 0 },
  { month: 'Fev', applications: 8, interviews: 3, offers: 1 },
  { month: 'Mar', applications: 12, interviews: 4, offers: 1 },
  { month: 'Abr', applications: 7, interviews: 5, offers: 2 },
  { month: 'Mai', applications: 15, interviews: 6, offers: 2 },
  { month: 'Jun', applications: 20, interviews: 8, offers: 3 },
  { month: 'Jul', applications: 18, interviews: 9, offers: 4 },
];

const techDemand = [
  { name: 'Java', demand: 87, color: '#6366f1' },
  { name: 'Spring', demand: 82, color: '#8b5cf6' },
  { name: 'React', demand: 78, color: '#06b6d4' },
  { name: 'Docker', demand: 75, color: '#10b981' },
  { name: 'AWS', demand: 71, color: '#f59e0b' },
  { name: 'PostgreSQL', demand: 68, color: '#ef4444' },
  { name: 'TypeScript', demand: 65, color: '#3b82f6' },
  { name: 'Kubernetes', demand: 55, color: '#ec4899' },
];

const pipelineData = [
  { name: 'Sourcing', value: 24, color: '#6366f1' },
  { name: 'Aplicado', value: 18, color: '#8b5cf6' },
  { name: 'Triagem', value: 12, color: '#06b6d4' },
  { name: 'Entrevista', value: 7, color: '#10b981' },
  { name: 'Técnica', value: 4, color: '#f59e0b' },
  { name: 'Oferta', value: 2, color: '#22c55e' },
];

const recentActivities = [
  { id: 1, type: 'application', text: 'Candidatura enviada para Senior Java Dev — Nubank', time: '2h atrás', icon: Briefcase, color: 'text-indigo-400' },
  { id: 2, type: 'interview', text: 'Entrevista técnica agendada — iFood (Amanhã 14h)', time: '4h atrás', icon: Calendar, color: 'text-emerald-400' },
  { id: 3, type: 'ai', text: 'Currículo personalizado gerado para PicPay', time: '6h atrás', icon: Sparkles, color: 'text-violet-400' },
  { id: 4, type: 'match', text: 'Match 94% encontrado — Staff Engineer — Mercado Libre', time: '8h atrás', icon: Zap, color: 'text-amber-400' },
  { id: 5, type: 'rejection', text: 'Feedback recebido — Itaú Unibanco (Processo encerrado)', time: '1d atrás', icon: XCircle, color: 'text-rose-400' },
  { id: 6, type: 'badge', text: 'Conquista desbloqueada: "Candidato Ativo" 🏆', time: '2d atrás', icon: Award, color: 'text-yellow-400' },
];

const favCompanies = [
  { name: 'Nubank', logo: '💜', match: 92, open: 14 },
  { name: 'iFood', logo: '🍕', match: 88, open: 8 },
  { name: 'Mercado Libre', logo: '🛒', match: 95, open: 22 },
  { name: 'PicPay', logo: '💚', match: 85, open: 6 },
  { name: 'Stone', logo: '💎', match: 79, open: 11 },
];

// ─── Animation variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

// ─── Animated Counter ────────────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);

  React.useEffect(() => {
    let start = 0;
    const step = value / 30;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplayed(value); clearInterval(timer); }
      else setDisplayed(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayed.toLocaleString()}</span>;
}

// ─── Custom Tooltip ──────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 shadow-xl">
        <p className="text-zinc-300 text-sm font-medium mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Main Dashboard ──────────────────────────────────────────────
export default function DashboardPage() {
  const metrics: MetricCard[] = [
    { label: 'Total de Vagas', value: 84, change: 12, icon: Briefcase, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Candidaturas', value: 67, change: 8, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Entrevistas', value: 23, change: 5, icon: MessageSquare, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { label: 'Propostas', value: 4, change: 2, icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Rejeições', value: 19, change: -3, icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { label: 'Score ATS Médio', value: '87%', change: 4, icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* ─── Header ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">
            Bom dia, Daniel! 👋
          </h1>
          <p className="text-zinc-400 mt-1">
            Você tem <span className="text-indigo-400 font-semibold">3 entrevistas</span> esta semana e{' '}
            <span className="text-emerald-400 font-semibold">12 novas vagas</span> com alto match.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
        >
          <Plus className="w-4 h-4" />
          Nova Candidatura
        </motion.button>
      </motion.div>

      {/* ─── XP Progress Bar ────────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          12
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-white font-semibold">Nível 12 — Pleno</span>
              <span className="text-zinc-400 text-sm ml-2">3.240 XP</span>
            </div>
            <span className="text-zinc-400 text-sm">760 XP para Nível 13</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '81%' }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-1 text-amber-400 text-sm font-medium">
          <Award className="w-4 h-4" />
          🔥 12 dias
        </div>
      </motion.div>

      {/* ─── Metric Cards ───────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={cardVariants}
            whileHover={{ scale: 1.02, translateY: -2 }}
            className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition-all cursor-default"
          >
            <div className={`w-9 h-9 rounded-xl ${metric.bg} flex items-center justify-center mb-3`}>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {typeof metric.value === 'number' ? <AnimatedNumber value={metric.value} /> : metric.value}
            </div>
            <div className="text-zinc-400 text-xs">{metric.label}</div>
            <div className={`text-xs font-medium mt-2 flex items-center gap-1 ${metric.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              <TrendingUp className="w-3 h-3" />
              {metric.change >= 0 ? '+' : ''}{metric.change} este mês
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── Charts Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold">Linha do Tempo de Candidaturas</h3>
              <p className="text-zinc-400 text-sm">Atividade dos últimos 7 meses</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />Candidaturas
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-violet-500 inline-block" />Entrevistas
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />Propostas
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={applicationTimeline}>
              <defs>
                <linearGradient id="gradApp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradInt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 12 }} />
              <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="applications" name="Candidaturas" stroke="#6366f1" fill="url(#gradApp)" strokeWidth={2} />
              <Area type="monotone" dataKey="interviews" name="Entrevistas" stroke="#8b5cf6" fill="url(#gradInt)" strokeWidth={2} />
              <Line type="monotone" dataKey="offers" name="Propostas" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pipeline Pie */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5"
        >
          <h3 className="text-white font-semibold mb-1">Pipeline Atual</h3>
          <p className="text-zinc-400 text-sm mb-4">Distribuição por etapa</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pipelineData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {pipelineData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pipelineData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-zinc-400">{item.name}</span>
                </div>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tech Demand */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <h3 className="text-white font-semibold">Tecnologias Mais Pedidas</h3>
          </div>
          <div className="space-y-3">
            {techDemand.map((tech, i) => (
              <div key={tech.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-300 font-medium">{tech.name}</span>
                  <span className="text-zinc-400">{tech.demand}%</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.demand}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-violet-400" />
            <h3 className="text-white font-semibold">Atividades Recentes</h3>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <activity.icon className={`w-3.5 h-3.5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-300 text-sm leading-tight">{activity.text}</p>
                  <p className="text-zinc-500 text-xs mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Favorite Companies */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-400" />
            <h3 className="text-white font-semibold">Empresas Favoritas</h3>
          </div>
          <div className="space-y-3">
            {favCompanies.map((company) => (
              <motion.div
                key={company.name}
                whileHover={{ x: 3 }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-800/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{company.logo}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{company.name}</p>
                    <p className="text-zinc-500 text-xs">{company.open} vagas abertas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-emerald-400 text-sm font-bold">{company.match}%</p>
                    <p className="text-zinc-500 text-xs">match</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
