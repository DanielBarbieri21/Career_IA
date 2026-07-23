import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../shared/hooks/useTheme';

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const getBreadcrumb = () => {
    const path = location.pathname.split('/')[1] || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="h-16 shrink-0 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-medium text-zinc-100 capitalize">
          {getBreadcrumb()}
        </h1>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg text-sm text-zinc-400 transition-colors w-64"
        >
          <Search size={16} />
          <span>Buscar vagas, currículos...</span>
          <kbd className="ml-auto bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-sans">Ctrl+K</kbd>
        </button>

        <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 bg-zinc-900/50 rounded-full border border-zinc-800/50">
          <div className="text-xs font-medium text-zinc-300">Lvl 12</div>
          <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
          </div>
          <div className="text-[10px] text-zinc-500 font-medium">650/1000 XP</div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-800/50 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border border-zinc-950"></span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-2 text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-800/50 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="w-8 h-8 rounded-full ml-2 border border-zinc-700 overflow-hidden cursor-pointer">
            <img src="https://i.pravatar.cc/150" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};
