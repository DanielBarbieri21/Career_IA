import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FileText, Target, Briefcase, Zap, Sparkles, 
  MessageSquare, KanbanSquare, BarChart3, Github, Linkedin, Map, 
  Bell, ChevronLeft, ChevronRight, Settings, LogOut, Moon
} from 'lucide-react';
import { useAuth } from '../../shared/hooks/useAuth';
import { useTheme } from '../../shared/hooks/useTheme';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/resumes', label: 'Currículo', icon: FileText },
  { path: '/ats', label: 'Análise ATS', icon: Target },
  { path: '/jobs', label: 'Vagas', icon: Briefcase },
  { path: '/match', label: 'Match Engine', icon: Zap },
  { path: '/ai', label: 'IA Generativa', icon: Sparkles },
  { path: '/interviews', label: 'Entrevistas', icon: MessageSquare },
  { path: '/crm', label: 'CRM', icon: KanbanSquare },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/portfolio', label: 'Portfolio', icon: Github },
  { path: '/linkedin-ai', label: 'LinkedIn AI', icon: Linkedin },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/notifications', label: 'Notificações', icon: Bell, badge: 3 },
];

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleCollapse }) => {
  const { logout, user } = useAuth();
  const { toggleTheme } = useTheme();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-full bg-zinc-950 border-r border-zinc-800/60 flex flex-col relative z-20 transition-all duration-300"
    >
      <div className="flex items-center h-16 px-4 shrink-0 border-b border-zinc-800/60">
        <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-indigo-500/20">
            AI
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent whitespace-nowrap">
              Career AI
            </span>
          )}
        </div>
        
        <button 
          onClick={toggleCollapse}
          className="absolute -right-3 top-5 bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-full p-1 hover:text-zinc-100 hover:bg-zinc-700 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} className="shrink-0" />
              {!isCollapsed && (
                <span className="truncate flex-1">{item.label}</span>
              )}
              {!isCollapsed && item.badge && (
                <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {isCollapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-zinc-800/60 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
            <img src={user?.avatar || "https://i.pravatar.cc/150"} alt="User" className="w-9 h-9 rounded-full shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">{user?.name || 'User Name'}</p>
              <p className="text-xs text-indigo-400 font-medium truncate">PRO Plan</p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors">
            <Settings size={20} className="shrink-0" />
            {!isCollapsed && <span>Configurações</span>}
          </button>
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
          >
            <Moon size={20} className="shrink-0" />
            {!isCollapsed && <span>Alternar Tema</span>}
          </button>
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span>Sair</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
};
