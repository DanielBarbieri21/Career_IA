import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan?: 'free' | 'pro' | 'enterprise';
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  loginWithOAuth2: (provider: string) => void;
  logout: () => void;
  refreshAccessToken: (newToken: string) => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: (token, refreshToken, user) => set({
        token,
        refreshToken,
        user,
        isAuthenticated: true,
      }),

      loginWithOAuth2: (provider) => {
        // Mock implementation for UI flow
        console.log(`Starting OAuth2 flow with ${provider}`);
        set({ isLoading: true });
        // Simulating redirect and callback
        setTimeout(() => {
          set({
            isAuthenticated: true,
            isLoading: false,
            token: 'mock_token',
            refreshToken: 'mock_refresh',
            user: { id: '1', name: 'Dev User', email: 'dev@example.com', plan: 'pro' }
          });
          window.location.href = '/dashboard';
        }, 1500);
      },

      logout: () => set({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
      }),

      refreshAccessToken: (newToken) => set({
        token: newToken,
      }),

      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token, 
        refreshToken: state.refreshToken, 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
