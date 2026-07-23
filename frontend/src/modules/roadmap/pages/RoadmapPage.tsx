import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Map, CheckCircle2, Circle, AlertCircle, ExternalLink, RefreshCw, Layers } from 'lucide-react';

const ROADMAP = [
  { 
    id: 1, 
    category: 'Alta Prioridade',
    color: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
    dot: 'bg-rose-500',
    items: [
      { name: 'Kubernetes (K8s) Fundamentals', desc: 'Requisito em 80% das vagas alvo.', hours: '20h', status: 'todo' },
      { name: 'Apache Kafka - Event Driven', desc: 'Essencial para as vagas do Nubank e Itaú.', hours: '15h', status: 'in_progress' }
    ]
  },
  { 
    id: 2, 
    category: 'Média Prioridade',
    color: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
    dot: 'bg-amber-500',
    items: [
      { name: 'AWS CloudFormation', desc: 'IaC aparece como diferencial.', hours: '10h', status: 'todo' },
      { name: 'GraphQL com Spring', desc: 'Substituindo REST em algumas vagas.', hours: '8h', status: 'todo' }
    ]
  },
  { 
    id: 3, 
    category: 'Já Dominado (Revisão)',
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    dot: 'bg-emerald-500',
    items: [
      { name: 'Java 17+ Features', desc: 'Records, Pattern Matching (Revisão rápida).', hours: '2h', status: 'done' },
      { name: 'Spring Boot 3', desc: 'Atualização do ecossistema.', hours: '4h', status: 'done' }
    ]
  }
];

export default function RoadmapPage() {
  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-zinc-300 font-sans">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Map className="w-8 h-8 text-indigo-500" />
            Plano de Estudos
          </h1>
          <p className="text-zinc-500 mt-1">Gerado com base nas suas análises de vagas.</p>
        </div>
        <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-2 rounded-xl transition-all">
          <RefreshCw className="w-4 h-4 text-indigo-400" />
          Regenerar Plano
        </button>
      </div>

      <div className="mb-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-semibold flex items-center gap-2"><Layers className="w-5 h-5 text-indigo-500"/> Progresso Geral</span>
          <span className="text-indigo-400 font-bold">25%</span>
        </div>
        <div className="w-full bg-zinc-950 rounded-full h-3 overflow-hidden border border-zinc-800">
          <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} transition={{ duration: 1 }} className="bg-gradient-to-r from-indigo-500 to-violet-600 h-full rounded-full" />
        </div>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
        {ROADMAP.map((section, idx) => (
          <div key={section.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-zinc-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 ${section.dot}`}>
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl shadow-zinc-950/50">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${section.color}`}>
                  {section.category}
                </span>
              </div>
              
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }} key={i} className="bg-zinc-950 border border-zinc-800/50 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      {item.status === 'done' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : item.status === 'in_progress' ? (
                        <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="text-zinc-200 font-semibold text-sm">{item.name}</h4>
                        <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs font-medium bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> {item.hours}
                          </span>
                          <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                            Ver Materiais <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
