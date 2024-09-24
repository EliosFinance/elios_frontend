import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './css/index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthProvider from '@/context/AuthProvider.tsx';

const queryClient = new QueryClient();

export const APP_ROUTES_ENUM = {
  HOME: '/',
  LEARN: '/learn',
  ARTICLE: '/article',
  ARTICLE_CATEGORIES: '/article-categories',
  ARTICLE_CATEGORY: '/article-category',
  LOGIN: '/login',
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing in index.html');
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);