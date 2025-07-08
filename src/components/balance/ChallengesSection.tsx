import { useGetChallenges } from '@/api';
import React from 'react';

const ChallengesSection: React.FC = () => {
    const { data: challenges, isLoading, isError } = useGetChallenges();

    return (
        <div className='rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4'>
            <div className='flex items-center gap-2 mb-4'>
                <div className='flex items-center justify-center w-6 h-6 rounded-lg bg-white/5 border border-white/10'>
                    <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            stroke='currentColor'
                            strokeWidth='2'
                            className='text-primary-400'
                        />
                    </svg>
                </div>
                <h3 className='text-lg font-bold text-white'>Défis</h3>
            </div>
            {isLoading ? (
                <div className='py-6 text-center text-gray-400'>
                    <svg className='w-12 h-12 mx-auto mb-2 animate-spin' viewBox='0 0 24 24' fill='none'>
                        <path d='M12 2a10 10 0 100 20 10 10 0 000-20z' stroke='currentColor' strokeWidth='2' />
                    </svg>
                    <p className='text-sm'>Chargement des défis...</p>
                </div>
            ) : isError ? (
                <div className='py-6 text-center text-red-500'>
                    <p className='text-sm'>Erreur lors du chargement des défis</p>
                </div>
            ) : challenges?.length === 0 ? (
                <div className='py-6 text-center text-gray-400'>
                    <p className='text-sm'>Aucun défi disponible</p>
                </div>
            ) : (
                <div className='space-y-3'>
                    {challenges.map((challenge) => (
                        <div key={challenge.id} className='p-3 rounded-lg bg-white/5 border border-white/10'>
                            <div className='flex items-start gap-3'>
                                <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex-shrink-0'>
                                    <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none'>
                                        <path
                                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            className='text-primary-400'
                                        />
                                    </svg>
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <h4 className='font-medium text-white text-sm leading-tight mb-1'>
                                        {challenge.title}
                                    </h4>
                                    <p className='text-xs text-gray-400 leading-relaxed'>{challenge.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChallengesSection;
