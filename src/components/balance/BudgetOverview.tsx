import { ConnectionType } from '@/types/connectionType';
import React, { useEffect, useState } from 'react';

const BudgetOverview: React.FC = ({ connections }: { connections: ConnectionType[] }) => {
    // Données hardcodées réalistes pour un étudiant français
    const [budget, setBudget] = useState<number>(800); // Budget mensuel étudiant typique
    const [spending, setSpending] = useState<number>(548.64); // Dépenses actuelles

    // useEffect(() => {
    //     if (connections) {
    //         const totalSpending = connections.reduce((acc: number, connection: ConnectionType) => {
    //             return acc + (connection.balance || 0);
    //         }, 0);

    //         setBudget(totalSpending + 2000);
    //         setSpending(totalSpending);
    //     }
    // }, [connections]);

    const remaining = budget - spending;
    const spendingPercentage = Math.min(100, Math.round((spending / budget) * 100));

    const circumference = 2 * Math.PI * 60;
    const dashOffset = circumference - (circumference * spendingPercentage) / 100;

    return (
        <div className='rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4'>
            <div className='flex items-center gap-2 mb-4'>
                <div className='flex items-center justify-center w-6 h-6 rounded-lg bg-white/5 border border-white/10'>
                    <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M12 2v20m0-20a10 10 0 0 1 0 20 10 10 0 0 1 0-20z'
                            stroke='currentColor'
                            strokeWidth='2'
                            className='text-primary-400'
                        />
                    </svg>
                </div>
                <h3 className='text-lg font-bold text-white'>Budget mensuel</h3>
            </div>

            <div className='flex items-center justify-center mb-4'>
                <div className='relative w-32 h-32'>
                    <svg className='w-full h-full' viewBox='0 0 140 140'>
                        <circle cx='70' cy='70' r='60' fill='transparent' stroke='#374151' strokeWidth='8' />
                        <circle
                            cx='70'
                            cy='70'
                            r='60'
                            fill='transparent'
                            stroke='var(--primary-500)'
                            strokeWidth='8'
                            strokeLinecap='round'
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                            transform='rotate(-90 70 70)'
                        />
                    </svg>

                    <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <span className='text-xl font-bold text-white'>{spendingPercentage}%</span>
                        <span className='text-xs text-gray-400'>utilisé</span>
                    </div>
                </div>
            </div>

            <div className='space-y-3'>
                <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-400'>Budget total</span>
                    <span className='font-medium text-white'>
                        {budget.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                </div>

                <div className='flex items-center justify-between text-sm'>
                    <span className='text-gray-400'>Dépenses</span>
                    <span className='font-medium text-primary-400'>
                        {spending.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                </div>

                <div className='flex items-center justify-between pt-2 border-t border-white/10'>
                    <span className='text-white font-medium'>Reste disponible</span>
                    <span className='font-bold text-white'>
                        {remaining.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BudgetOverview;
