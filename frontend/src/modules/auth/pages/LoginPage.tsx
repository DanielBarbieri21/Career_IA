import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useAuth } from '../../../shared/hooks/useAuth';

export const LoginPage = () => {
  const { loginWithOAuth2, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center relative overflow-hidden text-zinc-50 font-sans">
      
      {/* Background Animated Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 blur-[120px] rounded-full animate-pulse-glow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

      <div className="z-10 w-full max-w-md p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/20 mb-6">
            <span className="text-2xl font-bold text-white">AI</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Career AI</h1>
          <p className="text-zinc-400 text-lg">Inteligência Artificial para acelerar sua carreira</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/60 shadow-2xl"
        >
          <div className="space-y-4">
            <button 
              onClick={() => loginWithOAuth2('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 hover:bg-gray-50 px-4 py-3.5 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
              <Mail className="w-5 h-5 text-red-500" />
              Continuar com Google
            </button>

            <button 
              onClick={() => loginWithOAuth2('linkedin')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-[#0a66c2] text-white hover:bg-[#004182] px-4 py-3.5 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
              <Linkedin className="w-5 h-5" />
              Continuar com LinkedIn
            </button>

            <button 
              onClick={() => loginWithOAuth2('github')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 px-4 py-3.5 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] border border-zinc-700 disabled:opacity-70 disabled:hover:scale-100"
            >
              <Github className="w-5 h-5" />
              Continuar com GitHub
            </button>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-800/60 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-indigo-400 font-bold text-xl">14</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">Módulos</div>
            </div>
            <div>
              <div className="text-violet-400 font-bold text-xl">IA</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">Integrada</div>
            </div>
            <div>
              <div className="text-emerald-400 font-bold text-xl">ATS</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">Score</div>
            </div>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-zinc-500 text-xs mt-8 px-4"
        >
          Ao entrar, você concorda com os Termos de Uso e Política de Privacidade da Career AI.
        </motion.p>
      </div>
    </div>
  );
};

export default LoginPage;

