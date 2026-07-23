import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, MoreHorizontal, Briefcase, Calendar, Building, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const COLUMNS = [
  { id: 'sourcing', title: 'Sourcing', color: 'text-zinc-400' },
  { id: 'applied', title: 'Aplicado', color: 'text-blue-400' },
  { id: 'screening', title: 'Triagem', color: 'text-indigo-400' },
  { id: 'interview', title: 'Entrevista', color: 'text-violet-400' },
  { id: 'technical', title: 'Técnica', color: 'text-purple-400' },
  { id: 'offer', title: 'Oferta', color: 'text-emerald-400' },
  { id: 'rejected', title: 'Rejeitado', color: 'text-rose-400' },
  { id: 'dropped', title: 'Desistido', color: 'text-zinc-500' },
];

const INITIAL_CARDS = [
  { id: 1, company: 'Nubank', role: 'Senior Software Engineer', status: 'interview', priority: 'high', date: '2026-07-20', icon: '🟣' },
  { id: 2, company: 'iFood', role: 'Backend Engineer', status: 'technical', priority: 'medium', date: '2026-07-18', icon: '🍔' },
  { id: 3, company: 'Mercado Libre', role: 'Software Engineer', status: 'screening', priority: 'high', date: '2026-07-21', icon: '🤝' },
  { id: 4, company: 'Itaú', role: 'Tech Lead', status: 'offer', priority: 'high', date: '2026-07-15', icon: '🏦' },
  { id: 5, company: 'BTG Pactual', role: 'Senior Developer', status: 'applied', priority: 'medium', date: '2026-07-22', icon: '📈' },
  { id: 6, company: 'PicPay', role: 'Staff Engineer', status: 'sourcing', priority: 'low', date: '2026-07-10', icon: '💚' },
  { id: 7, company: 'Stone', role: 'Software Engineer', status: 'rejected', priority: 'medium', date: '2026-07-05', icon: '🪨' },
];

export default function CrmPage() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [search, setSearch] = useState('');

  const filteredCards = cards.filter(c => c.company.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-zinc-300 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Kanban de Candidaturas</h1>
          <p className="text-zinc-500 mt-1">Acompanhe seu funil de vagas e oportunidades.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar candidatura..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20">
            <Plus className="w-4 h-4" />
            <span>Nova</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar items-start">
        {COLUMNS.map(col => {
          const colCards = filteredCards.filter(c => c.status === col.id);
          return (
            <div key={col.id} className="min-w-[320px] bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4 flex flex-col max-h-[calc(100vh-140px)]">
              <div className="flex justify-between items-center mb-4 px-1">
                <h3 className={`font-semibold flex items-center gap-2 ${col.color}`}>
                  {col.title}
                  <span className="bg-zinc-800 text-zinc-400 text-xs py-0.5 px-2 rounded-full">{colCards.length}</span>
                </h3>
                <button className="text-zinc-500 hover:text-zinc-300">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                <AnimatePresence>
                  {colCards.map((card, i) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.05 }}
                      key={card.id}
                      className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 p-4 rounded-xl cursor-grab active:cursor-grabbing group transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{card.icon}</span>
                          <span className="font-semibold text-zinc-100">{card.company}</span>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-zinc-300 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-zinc-400 mb-4">{card.role}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {card.date}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-md ${
                          card.priority === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                          card.priority === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {card.priority}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {colCards.length === 0 && (
                  <div className="border-2 border-dashed border-zinc-800/50 rounded-xl p-4 flex flex-col items-center justify-center text-zinc-500 h-24">
                    <span className="text-sm">Solte cards aqui</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
