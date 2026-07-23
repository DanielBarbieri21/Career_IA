import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock simple chart layout since recharts might not be installed, using pure CSS/HTML visual representation for premium look.
export default function AnalyticsPage() {
  const stats = [
    { label: 'Candidaturas (Mês)', value: '42', trend: '+12%', up: true },
    { label: 'Taxa de Entrevista', value: '18%', trend: '+4%', up: true },
    { label: 'Rejeições (Filtro)', value: '12', trend: '-2%', up: false },
    { label: 'Match Médio', value: '84%', trend: '+5%', up: true },
  ];

  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-zinc-300 font-sans">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-500" />
            Analytics & Insights
          </h1>
          <p className="text-zinc-500 mt-1">Métricas de performance do seu funil de carreira.</p>
        </div>
        <select className="bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500">
          <option>Últimos 30 dias</option>
          <option>Últimos 90 dias</option>
          <option>Este Ano</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
            <p className="text-sm font-medium text-zinc-400 mb-2">{stat.label}</p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-white">{stat.value}</span>
              <span className={`flex items-center text-sm font-medium mb-1 ${stat.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.up ? <ArrowUpRight className="w-4 h-4 mr-0.5" /> : <ArrowDownRight className="w-4 h-4 mr-0.5" />}
                {stat.trend}
              </span>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp className="w-24 h-24 text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-96 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Funil de Conversão</h3>
          <div className="flex-1 flex flex-col justify-end gap-4">
            {/* Mocking a Bar Chart with CSS */}
            {[
              { label: 'Visualizados', val: 100, color: 'bg-zinc-700' },
              { label: 'Aplicados', val: 75, color: 'bg-indigo-500' },
              { label: 'Triagem', val: 40, color: 'bg-violet-500' },
              { label: 'Entrevista', val: 15, color: 'bg-purple-500' },
              { label: 'Oferta', val: 5, color: 'bg-emerald-500' }
            ].map((bar, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-24 text-sm text-zinc-400 text-right">{bar.label}</span>
                <div className="flex-1 h-6 bg-zinc-950 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${bar.val}%` }} transition={{ duration: 1, delay: i * 0.1 }} className={`h-full ${bar.color} rounded-full`} />
                </div>
                <span className="w-10 text-sm font-bold text-white">{bar.val}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Insights da IA Generativa</h3>
          <div className="space-y-4">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex gap-4">
              <div className="mt-1">
                <span className="flex h-3 w-3 rounded-full bg-indigo-500 animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-indigo-400 font-semibold mb-1">Taxa de sucesso aumentada</h4>
                <p className="text-sm text-zinc-400">Sua aderência melhorou 15% após adicionar os projetos de Microsserviços. Foque em vagas que pedem Spring Cloud.</p>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-4">
              <div className="mt-1">
                <span className="flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </div>
              <div>
                <h4 className="text-emerald-400 font-semibold mb-1">Setor Financeiro</h4>
                <p className="text-sm text-zinc-400">Suas candidaturas para Fintechs (Nubank, Itaú) têm 40% mais conversão que E-commerce. Recomendamos priorizar este setor.</p>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-4">
              <div className="mt-1">
                <span className="flex h-3 w-3 rounded-full bg-amber-500"></span>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold mb-1">Atenção ao tempo de resposta</h4>
                <p className="text-sm text-zinc-400">As empresas estão demorando em média 12 dias para responder na etapa de Triagem. Não deixe de fazer follow-up.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
