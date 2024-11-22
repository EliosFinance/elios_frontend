import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './css/index.css';
import AuthProvider from '@/context/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export const APP_ROUTES_ENUM = {
    HOME: '/',
    ACCOUNT: '/account',
    LEARN: '/learn',
    ARTICLE: '/article',
    ARTICLE_CATEGORIES: '/article-categories',
    ARTICLE_CATEGORY: '/article-category',
    LOGIN: '/login',
    DEFI: '/challenge',
    Friends: '/friends',
    SINGLE_FRIEND: '/friends/:id',
    TEST: '/test',
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
    </React.StrictMode>,
);
