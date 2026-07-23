import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Mail, MessageSquare, Reply, Building, BookOpen, Target, Code, Star, Linkedin, User, ChevronRight } from 'lucide-react';

const TOOLS = [
  { id: 1, title: 'Resumo Profissional', icon: <Sparkles className="w-6 h-6" />, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  { id: 2, title: 'Currículo Personalizado', icon: <FileText className="w-6 h-6" />, color: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
  { id: 3, title: 'Carta de Apresentação', icon: <Mail className="w-6 h-6" />, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { id: 4, title: 'Mensagem para Recrutador', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  { id: 5, title: 'Resposta ao RH', icon: <Reply className="w-6 h-6" />, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { id: 6, title: 'Resumo da Empresa', icon: <Building className="w-6 h-6" />, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { id: 7, title: 'Plano de Estudos', icon: <BookOpen className="w-6 h-6" />, color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  { id: 8, title: 'Preparação para Entrevista', icon: <Target className="w-6 h-6" />, color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  { id: 9, title: 'Simulação Técnica', icon: <Code className="w-6 h-6" />, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { id: 10, title: 'Perguntas STAR', icon: <Star className="w-6 h-6" />, color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { id: 11, title: 'Post LinkedIn', icon: <Linkedin className="w-6 h-6" />, color: 'bg-blue-600/10 text-blue-500 border-blue-600/20' },
  { id: 12, title: 'Otimizar Perfil', icon: <User className="w-6 h-6" />, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
];

export default function AiHubPage() {
  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-zinc-300 font-sans flex">
      <div className="flex-1 pr-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-indigo-500" />
              Central de IA
            </h1>
            <p className="text-zinc-500 mt-1">Sua suíte generativa para decolar na carreira.</p>
          </div>
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-medium text-white">GPT-4o</span>
            <span className="text-xs text-zinc-500 border-l border-zinc-700 pl-3">45.2k tokens</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TOOLS.map((tool, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={tool.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-5 cursor-pointer group transition-all"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${tool.color} group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-indigo-400 transition-colors">{tool.title}</h3>
              <p className="text-xs text-zinc-500">Clique para gerar conteúdo otimizado automaticamente.</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Sidebar Mock */}
      <div className="w-[400px] border-l border-zinc-800 pl-6 hidden xl:flex flex-col h-[calc(100vh-48px)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Mensagem para Recrutador</h2>
        </div>
        
        <div className="space-y-4 flex-1">
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Link da Vaga ou Empresa</label>
            <input type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500" placeholder="Ex: nubank.com.br/careers" />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Tom da Mensagem</label>
            <div className="flex gap-2">
              <button className="flex-1 bg-indigo-500 text-white rounded-lg py-1.5 text-sm font-medium">Profissional</button>
              <button className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-lg py-1.5 text-sm font-medium hover:bg-zinc-800">Casual</button>
              <button className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-lg py-1.5 text-sm font-medium hover:bg-zinc-800">Direto</button>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Gerar Mensagem
          </button>
          
          <div className="mt-8">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block flex justify-between items-center">
              Resultado 
              <span className="flex items-center gap-1 text-indigo-400"><Sparkles className="w-3 h-3"/> AI Typing...</span>
            </label>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed min-h-[200px] relative">
              <p>Olá [Nome do Recrutador], tudo bem?</p>
              <p className="mt-2">Acompanho o trabalho incrível que o time de engenharia está fazendo no [Empresa], especialmente no projeto de [Mencionar Projeto].</p>
              <p className="mt-2">Notei a abertura para a vaga de [Cargo] e acredito que minha experiência com [Tecnologia 1] e [Tecnologia 2] pode agregar muito ao desafio de escalar a arquitetura que vocês vêm construindo.<span className="w-2 h-4 bg-indigo-400 inline-block animate-pulse ml-1 align-middle"></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
