import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, FileText, Briefcase, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isOpen ? onClose() : onClose(); // In a real scenario, this would toggle. For this demo, it's controlled by parent.
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          <Command
            className="w-full h-full"
            loop
            shouldFilter={false} // Would filter locally in real app
          >
            <div className="flex items-center px-4 py-3 border-b border-zinc-800">
              <Search className="w-5 h-5 text-zinc-500 mr-3 shrink-0" />
              <Command.Input
                autoFocus
                placeholder="Busque ações, vagas, currículos..."
                value={inputValue}
                onValueChange={setInputValue}
                className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:outline-none text-base"
              />
              <button onClick={onClose} className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 ml-2">
                <X className="w-4 h-4" />
              </button>
            </div>

            <Command.List className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
              <Command.Empty className="py-6 text-center text-zinc-400 text-sm">
                Nenhum resultado encontrado.
              </Command.Empty>

              <Command.Group heading="Ações Rápidas" className="text-xs font-medium text-zinc-500 mb-2 px-2 py-1">
                <Command.Item className="flex items-center px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-indigo-500/20 hover:text-indigo-300 cursor-pointer aria-selected:bg-indigo-500/20 aria-selected:text-indigo-300">
                  <Play className="w-4 h-4 mr-3 text-indigo-400" />
                  Iniciar Nova Entrevista
                  <span className="ml-auto text-xs text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">Cmd+I</span>
                </Command.Item>
                <Command.Item className="flex items-center px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-indigo-500/20 hover:text-indigo-300 cursor-pointer aria-selected:bg-indigo-500/20 aria-selected:text-indigo-300">
                  <FileText className="w-4 h-4 mr-3 text-indigo-400" />
                  Gerar Novo Currículo (IA)
                  <span className="ml-auto text-xs text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">Cmd+G</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Vagas Recentes" className="text-xs font-medium text-zinc-500 mb-2 px-2 py-1 mt-2">
                <Command.Item className="flex items-center px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-zinc-800 cursor-pointer aria-selected:bg-zinc-800">
                  <Briefcase className="w-4 h-4 mr-3 text-zinc-400" />
                  Engenheiro de Software Senior - Google
                </Command.Item>
                <Command.Item className="flex items-center px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-zinc-800 cursor-pointer aria-selected:bg-zinc-800">
                  <Briefcase className="w-4 h-4 mr-3 text-zinc-400" />
                  Tech Lead Frontend - Nubank
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
