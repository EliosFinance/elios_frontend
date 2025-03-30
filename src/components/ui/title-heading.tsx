// src/components/TitleHeading.tsx
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface TitleHeadingProps {
    title: string;
    onBack?: () => void;
}

const TitleHeading = ({ title, onBack }: TitleHeadingProps) => {
    const headerClass = onBack
        ? 'flex items-center w-full h-12 gap-x-3 bg-white'
        : 'flex items-center w-full h-12 px-4 gap-x-3 bg-white';

    return (
        <header className={headerClass}>
            {onBack && (
                <button
                    className='flex items-center justify-center w-10 h-10 rounded-full'
                    onClick={onBack}
                    aria-label='Go back'
                >
                    <ArrowLeftIcon className='w-6 h-6 text-gray-700' />
                </button>
            )}
            <h1 className='text-lg font-semibold text-gray-800'>{title}</h1>
        </header>
    );
};

export default TitleHeading;
