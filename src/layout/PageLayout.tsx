import TitleHeading from '@/components/ui/title-heading';
import React from 'react';

interface PageLayoutProps {
    title: string;
    onBack?: () => void;
    children: React.ReactNode;
}

export default function PageLayout({ title, onBack, children }: PageLayoutProps) {
    return (
        <div className='flex flex-col w-full h-full min-h-screen bg-gray-50'>
            <TitleHeading title={title} onBack={onBack} />
            <div className='flex flex-col w-full px-4 py-6'>{children}</div>
        </div>
    );
}
