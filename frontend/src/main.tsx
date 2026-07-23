import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { AppProviders } from './app/providers';
import { AppRouter } from './app/router';
import './index.css';

// Configuração do i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': {
        translation: {
          "welcome": "Bem-vindo",
        }
      }
    },
    lng: "pt-BR",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AppProviders>
            <AppRouter />
          </AppProviders>
        </I18nextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
