import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Target, TrendingUp, AlertTriangle, FileText, Briefcase } from 'lucide-react';

export default function MatchPage() {
  const results = {
    ats: 92,
    hr: 85,
    tech: 78,
    final: 85
  };

  const Gauge = ({ value, label, color, delay }: { value: number, label: string, color: string, delay: number }) => {
    const circ = 2 * Math.PI * 30;
    const offset = circ - (value / 100) * circ;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-2">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="30" className="stroke-zinc-800" strokeWidth="8" fill="none" />
            <motion.circle 
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, delay }}
              cx="48" cy="48" r="30" 
              className={color} 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray={circ}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-white">{value}%</span>
          </div>
        </div>
        <span className="text-sm font-medium text-zinc-400">{label}</span>
      </div>
    );
  };

  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-zinc-300 font-sans">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Zap className="w-8 h-8 text-indigo-500" />
            Match Engine
          </h1>
          <p className="text-zinc-500 mt-1">Inteligência Artificial para prever seu sucesso nas vagas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div className="flex-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Currículo</p>
                  <select className="w-full bg-transparent text-white font-medium focus:outline-none appearance-none">
                    <option>CV_Senior_Java_2026.pdf</option>
                  </select>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-zinc-600 hidden md:block" />
              <div className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-violet-400" />
                <div className="flex-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Vaga</p>
                  <select className="w-full bg-transparent text-white font-medium focus:outline-none appearance-none">
                    <option>Senior Software Engineer - Nubank</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-zinc-800">
              <Gauge value={results.ats} label="Filtro ATS" color="stroke-indigo-500" delay={0.2} />
              <Gauge value={results.hr} label="Fit Cultural (RH)" color="stroke-violet-500" delay={0.4} />
              <Gauge value={results.tech} label="Aderência Técnica" color="stroke-purple-500" delay={0.6} />
              
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="45" className="stroke-zinc-800" strokeWidth="12" fill="none" />
                    <motion.circle 
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      animate={{ strokeDashoffset: (2 * Math.PI * 45) - (results.final / 100) * (2 * Math.PI * 45) }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      cx="64" cy="64" r="45" 
                      className="stroke-emerald-500" 
                      strokeWidth="12" 
                      fill="none" 
                      strokeDasharray={2 * Math.PI * 45}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{results.final}%</span>
                  </div>
                </div>
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Match Final</span>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
               <button className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
                 <Sparkles className="w-5 h-5" />
                 Gerar Estratégia de Aplicação
               </button>
            </div>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Gaps Técnicos & Prioridades
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Kubernetes', level: 'Alta', time: '1 mês' },
                { name: 'Kafka / Mensageria', level: 'Alta', time: '2 semanas' },
                { name: 'GraphQL', level: 'Média', time: '1 semana' }
              ].map((gap, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <span className="font-medium text-zinc-200">{gap.name}</span>
                  <div className="flex gap-3 text-sm">
                    <span className="text-amber-400">Prioridade {gap.level}</span>
                    <span className="text-zinc-500">{gap.time} prep.</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900/50 to-violet-900/50 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-indigo-300 font-semibold mb-6 uppercase tracking-wider text-sm">Inteligência de Mercado</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-zinc-400 text-sm mb-1">Senioridade Detectada</p>
                  <p className="text-2xl font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-400" />
                    Sênior (L4)
                  </p>
                </div>
                
                <div>
                  <p className="text-zinc-400 text-sm mb-1">Estimativa Salarial (CLT)</p>
                  <p className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    R$ 18k - R$ 22k
                  </p>
                </div>

                <div>
                  <p className="text-zinc-400 text-sm mb-1">Elegibilidade Total</p>
                  <p className="text-lg font-medium text-amber-400">
                    2 meses de preparo focado
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-20">
              <Sparkles className="w-48 h-48 text-indigo-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
