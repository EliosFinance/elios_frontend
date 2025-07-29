import { ChevronLeft } from 'lucide-react';
import React from 'react';

interface PageLayoutProps {
    title: string;
    onBack?: () => void;
    children: React.ReactNode;
}

export default function PageLayout({ title, onBack, children }: PageLayoutProps) {
    return (
        <div className='flex flex-col w-full h-full min-h-screen'>
            <div className='flex flex-col items-start justify-center w-full px-6 pt-12'>
                <div className='flex items-center gap-x-2'>
                    {onBack && (
                        <button
                            onClick={onBack}
                            className='p-1 rounded-full transition-colors hover:bg-gray-800/50'
                            aria-label='Retour'
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <h1 className='font-black text-primary-500'>{title}</h1>
                </div>
            </div>
            <div className='flex flex-col w-full px-6 py-6'>{children}</div>
        </div>
    );
}
