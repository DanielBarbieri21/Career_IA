import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Building, Zap, Bookmark, ExternalLink, Filter } from 'lucide-react';

const JOBS = [
  { id: 1, title: 'Senior Software Engineer', company: 'Nubank', location: 'São Paulo, SP (Híbrido)', salary: 'R$ 18k - 22k', score: 92, tags: ['Java', 'Spring', 'Kafka'], logo: '🟣' },
  { id: 2, title: 'Especialista Backend', company: 'Itaú', location: 'Remoto', salary: 'R$ 19k - 24k', score: 88, tags: ['Java', 'AWS', 'Microsserviços'], logo: '🏦' },
  { id: 3, title: 'Staff Engineer', company: 'PicPay', location: 'Remoto', salary: 'R$ 20k - 25k', score: 85, tags: ['Node.js', 'Go', 'Kubernetes'], logo: '💚' },
  { id: 4, title: 'Engenheiro de Software Sênior', company: 'Mercado Livre', location: 'Osasco, SP (Híbrido)', salary: 'R$ 16k - 20k', score: 75, tags: ['Java', 'Golang', 'GCP'], logo: '🤝' },
];

export default function JobsPage() {
  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-zinc-300 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Oportunidades mapeadas</h1>
          <p className="text-zinc-500 mt-1">Vagas importadas e analisadas pelo seu Career Engine.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors">
            Colar URL
          </button>
          <button className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Importar Vaga
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar por cargo, empresa ou tecnologia..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-zinc-400 hover:text-white transition-colors">
          <Filter className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {JOBS.map((job, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={job.id}
            className="bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 rounded-2xl p-5 group transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {job.logo}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{job.title}</h3>
                  <p className="text-zinc-400 text-sm flex items-center gap-1 mt-1">
                    <Building className="w-3.5 h-3.5" /> {job.company}
                  </p>
                </div>
              </div>
              <button className="text-zinc-500 hover:text-indigo-400 transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
              <span className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-emerald-400" /> {job.salary}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {job.tags.map(tag => (
                <span key={tag} className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="20" cy="20" r="16" className="stroke-zinc-800" strokeWidth="4" fill="none" />
                    <circle cx="20" cy="20" r="16" className={`${job.score >= 90 ? 'stroke-emerald-500' : 'stroke-indigo-500'}`} strokeWidth="4" fill="none" strokeDasharray="100" strokeDashoffset={100 - job.score} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{job.score}</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Match Score</span>
              </div>
              
              <button className="text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
                Ver Análise <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
