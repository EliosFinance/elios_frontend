import { instance_back } from '@/api/const';
import { userStore } from '@/store/UserStore';
import React, { useEffect, useState } from 'react';

type Subscription = {
    id: number;
    name: string;
    monthlyCost: number;
};

const SubscriptionsSection: React.FC = () => {
    const [subscriptions, _setSubscriptions] = useState<Subscription[]>([
        { id: 1, name: 'Figma', monthlyCost: 12.99 },
        { id: 2, name: 'Spotify', monthlyCost: 9.99 },
        { id: 3, name: 'Slack', monthlyCost: 15.99 },
    ]);
    const [totalRecurring, _setTotalRecurring] = useState<number>(38.97);

    // useEffect(() => {
    //     async function fetchSubscriptions() {
    //         try {
    //             const headers = userStore.getState().getAuth();
    //             const response = await instance_back.get('powens/subscriptions', { headers });
    //             setSubscriptions(response.data);
    //             const total = response.data.reduce((acc: number, sub: Subscription) => acc + sub.monthlyCost, 0);
    //             setTotalRecurring(total);
    //         } catch (error) {
    //             console.error('Erreur lors de la récupération des abonnements:', error);
    //         }
    //     }
    //     fetchSubscriptions();
    // }, []);

    return (
        <div className='rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4'>
            <div className='flex items-center gap-2 mb-4'>
                <div className='flex items-center justify-center w-6 h-6 rounded-lg bg-white/5 border border-white/10'>
                    <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none'>
                        <path d='M12 2v20m8-10H4' stroke='currentColor' strokeWidth='2' className='text-primary-400' />
                    </svg>
                </div>
                <h3 className='text-lg font-bold text-white'>Abonnements</h3>
            </div>

            {subscriptions.length > 0 ? (
                <>
                    <div className='space-y-3 mb-4'>
                        {subscriptions.map((sub) => (
                            <div
                                key={sub.id}
                                className='flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10'
                            >
                                <div className='flex items-center gap-3'>
                                    <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10'>
                                        <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none'>
                                            <circle
                                                cx='12'
                                                cy='12'
                                                r='10'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                className='text-primary-400'
                                            />
                                            <path
                                                d='M12 6v6l4 2'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                className='text-primary-400'
                                            />
                                        </svg>
                                    </div>
                                    <span className='text-white text-sm font-medium'>{sub.name}</span>
                                </div>
                                <span className='text-primary-400 font-medium text-sm'>
                                    {sub.monthlyCost.toLocaleString('fr-FR', {
                                        style: 'currency',
                                        currency: 'EUR',
                                    })}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className='pt-3 border-t border-white/10'>
                        <div className='flex items-center justify-between'>
                            <span className='text-white font-medium'>Total mensuel</span>
                            <span className='text-white font-bold'>
                                {totalRecurring.toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <div className='py-6 text-center text-gray-400'>
                    <svg className='w-12 h-12 mx-auto mb-2 text-gray-500' viewBox='0 0 24 24' fill='none'>
                        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
                        <path d='M12 6v6l4 2' stroke='currentColor' strokeWidth='2' />
                    </svg>
                    <p className='text-sm'>Aucun abonnement détecté</p>
                </div>
            )}
        </div>
    );
};

export default SubscriptionsSection;
