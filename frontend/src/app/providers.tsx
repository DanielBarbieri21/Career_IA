import React, { Suspense, useEffect } from 'react';
import { useTheme } from '../shared/hooks/useTheme';

// Aplica dark mode imediatamente para evitar flash
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
}

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-400 text-sm">Carregando Career AI...</p>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
};
