import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, XCircle, Sparkles, Target, Zap, Server, Cloud, Code } from 'lucide-react';

export default function AtsPage() {
  const score = 87;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-zinc-300 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Análise ATS</h1>
        <p className="text-zinc-500 mt-1">Descubra sua aderência à vaga e otimize seu currículo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24 text-indigo-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-400" />
              Upload & Análise
            </h2>
            <div className="border-2 border-dashed border-zinc-700 hover:border-indigo-500 transition-colors bg-zinc-950/50 rounded-xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer">
              <div className="bg-zinc-900 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-indigo-400" />
              </div>
              <p className="text-zinc-300 font-medium mb-1">Arraste seu currículo ou clique aqui</p>
              <p className="text-zinc-500 text-sm">Suporta PDF, DOCX até 5MB</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-px bg-zinc-800 flex-1"></div>
              <span className="text-zinc-500 text-sm font-medium">OU</span>
              <div className="h-px bg-zinc-800 flex-1"></div>
            </div>
            <textarea 
              className="w-full mt-4 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              rows={4}
              placeholder="Cole a descrição da vaga aqui..."
            ></textarea>
            <button className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Analisar com IA
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Pontos Fortes
              </h3>
              <ul className="space-y-3">
                {['Experiência com Spring Boot', 'Arquitetura de Microsserviços', 'Forte background em Java', 'Conhecimento em Docker'].map((item, i) => (
                  <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                Gaps Encontrados
              </h3>
              <ul className="space-y-3">
                {['Falta experiência com Kafka', 'AWS CloudFormation não mencionado', 'Testes e2e (Cypress) ausentes'].map((item, i) => (
                  <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-white mb-6 w-full text-left">Score Geral</h3>
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="45" className="stroke-zinc-800" strokeWidth="12" fill="none" />
                <motion.circle 
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="96" cy="96" r="45" 
                  className="stroke-indigo-500" 
                  strokeWidth="12" 
                  fill="none" 
                  strokeDasharray={circumference}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400">{score}%</span>
                <span className="text-xs text-zinc-500 mt-1">Match Rate</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Análise de Skills</h3>
            <div className="space-y-4">
              {[
                { name: 'Java', val: 100, icon: <Code className="w-4 h-4" /> },
                { name: 'Spring', val: 95, icon: <Zap className="w-4 h-4" /> },
                { name: 'Docker', val: 85, icon: <Server className="w-4 h-4" /> },
                { name: 'AWS', val: 90, icon: <Cloud className="w-4 h-4" /> },
              ].map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium flex items-center gap-2 text-zinc-200">
                      {skill.icon} {skill.name}
                    </span>
                    <span className="text-xs text-zinc-400">{skill.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.val}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
