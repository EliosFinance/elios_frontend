import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './css/index.css';
import AuthProvider from '@/context/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export const APP_ROUTES_ENUM = {
    HOME: '/home',
    LANDING: '/landing',
    ACCOUNT: '/account',
    LEARN: '/learn',
    ARTICLE: '/article',
    ARTICLE_CATEGORIES: '/article-categories',
    ARTICLE_CATEGORY: '/article-category',
    LOGIN: '/login',
    DEFI: '/challenge',
    FRIENDS: '/friends',
    SINGLE_FRIEND: '/friends/:id',
    REWARDS: '/rewards',
    TEST: '/test',
    PARTNERS: '/partners',
    REGISTER: '/signup',
    VERIFY_EMAIL: '/verify-email',
    CREATE_USERNAME: '/create_username',
    CREATE_PASSWORD: '/create-password',
    CONFIRM_PASSWORD: '/confirm-password',
    CREATE_PIN: '/create-pin',
    CONFIRM_PIN: '/confirm-pin',
    TERMS: '/terms',
    PIN: '/pin',
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
