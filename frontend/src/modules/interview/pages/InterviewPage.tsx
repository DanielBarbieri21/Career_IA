import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Code, Shield, CheckCircle, ChevronRight, Play, Settings } from 'lucide-react';

export default function InterviewPage() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="p-6 bg-zinc-950 min-h-screen text-zinc-300 font-sans flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Simulador de Entrevista AI</h1>
            <p className="text-zinc-500 mt-2">Pratique com um entrevistador virtual adaptado à sua vaga alvo.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-zinc-400 mb-2 block">Tipo de Entrevista</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500">
                  <option>Técnica (Hard Skills)</option>
                  <option>Comportamental (STAR)</option>
                  <option>System Design</option>
                  <option>Fit Cultural (RH)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400 mb-2 block">Senioridade</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500">
                  <option>Pleno</option>
                  <option>Sênior</option>
                  <option>Staff / Principal</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-2 block">Foco / Stack Principal</label>
              <input type="text" defaultValue="Java, Spring Boot, Microsserviços" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" />
            </div>
            
            <button onClick={() => setStarted(true)} className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 mt-4">
              <Play className="w-6 h-6 fill-current" />
              Iniciar Simulação
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-zinc-300 font-sans flex flex-col">
      <div className="flex justify-between items-center mb-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-white">Entrevista Técnica: Java Sênior</h2>
            <p className="text-sm text-zinc-500">Pergunta 2 de 5</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-zinc-950 rounded-lg px-4 py-2 border border-zinc-800 text-rose-400 font-mono text-xl font-bold">
          <Clock className="w-5 h-5" />
          03:45
        </div>
      </div>

      <div className="flex-1 flex gap-6">
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex-1">
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0">
                AI
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl rounded-tl-none p-5 text-lg text-zinc-200">
                "Como você lidaria com um problema de concorrência em uma aplicação Spring Boot onde múltiplas threads tentam atualizar o saldo de uma mesma conta bancária simultaneamente?"
              </div>
            </div>

            <div className="mt-8">
              <label className="text-sm font-medium text-zinc-400 mb-2 block flex justify-between items-center">
                Sua Resposta
                <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300">Gravação de Voz Desativada</span>
              </label>
              <textarea 
                className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-white focus:outline-none focus:border-indigo-500 resize-none text-lg"
                placeholder="Digite sua resposta aqui..."
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button className="text-zinc-500 hover:text-white font-medium px-4 py-2 transition-colors">
              Pular Pergunta
            </button>
            <button className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
              Próxima Pergunta
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-80 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hidden lg:block">
          <h3 className="font-bold text-white mb-6">Dicas da IA</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-zinc-400">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              Mencione Isolamento de Transações no banco de dados.
            </li>
            <li className="flex gap-3 text-sm text-zinc-400">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              Fale sobre Pessimistic vs Optimistic Locking.
            </li>
            <li className="flex gap-3 text-sm text-zinc-400">
              <Shield className="w-5 h-5 text-indigo-400 shrink-0" />
              Não esqueça da anotação @Transactional do Spring.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
