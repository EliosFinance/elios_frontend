import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './css/index.css';
import AuthProvider from '@/context/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

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
