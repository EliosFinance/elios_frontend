import { instance_back } from '@/api/const';
import { userStore } from '@/store/UserStore';
import React, { useEffect, useState } from 'react';

type Challenge = {
    id: number;
    title: string;
    description: string;
};

const ChallengesSection: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    useEffect(() => {
        async function fetchChallenges() {
            try {
                const headers = userStore.getState().getAuth();
                const response = await instance_back.get('powens/challenges', { headers });
                setChallenges(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des défis:', error);
            }
        }
        fetchChallenges();
    }, []);

    return (
        <div className='rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4'>
            <div className='flex items-center gap-2 mb-4'>
                <div className='flex items-center justify-center w-6 h-6 rounded-lg bg-white/5 border border-white/10'>
                    <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none'>
                        <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' stroke='currentColor' strokeWidth='2' className='text-primary-400'/>
                    </svg>
                </div>
                <h3 className='text-lg font-bold text-white'>Défis</h3>
            </div>
            
            {challenges.length > 0 ? (
                <div className='space-y-3'>
                    {challenges.map((challenge) => (
                        <div key={challenge.id} className='p-3 rounded-lg bg-white/5 border border-white/10'>
                            <div className='flex items-start gap-3'>
                                <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex-shrink-0'>
                                    <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none'>
                                        <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' stroke='currentColor' strokeWidth='2' className='text-primary-400'/>
                                    </svg>
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <h4 className='font-medium text-white text-sm leading-tight mb-1'>{challenge.title}</h4>
                                    <p className='text-xs text-gray-400 leading-relaxed'>{challenge.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='py-6 text-center text-gray-400'>
                    <svg className='w-12 h-12 mx-auto mb-2 text-gray-500' viewBox='0 0 24 24' fill='none'>
                        <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' stroke='currentColor' strokeWidth='2'/>
                    </svg>
                    <p className='text-sm'>Aucun défi disponible</p>
                </div>
            )}
        </div>
    );
};

export default ChallengesSection;
