import { instance_back } from '@/api/const';
import { userStore } from '@/store/UserStore';
import React, { useEffect, useState } from 'react';

type Subscription = {
    id: number;
    name: string;
    monthlyCost: number;
};

const SubscriptionsSection: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [totalRecurring, setTotalRecurring] = useState<number>(0);

    useEffect(() => {
        async function fetchSubscriptions() {
            try {
                const headers = userStore.getState().getAuth();
                const response = await instance_back.get('powens/subscriptions', { headers });
                setSubscriptions(response.data);
                const total = response.data.reduce((acc: number, sub: Subscription) => acc + sub.monthlyCost, 0);
                setTotalRecurring(total);
            } catch (error) {
                console.error('Erreur lors de la récupération des abonnements:', error);
            }
        }
        fetchSubscriptions();
    }, []);

    return (
        <div className='p-4 my-4 bg-white rounded shadow'>
            <h2 className='text-xl font-bold'>Abonnements</h2>
            <ul className='mt-2'>
                {subscriptions.map((sub) => (
                    <li key={sub.id} className='flex justify-between py-2 border-b'>
                        <span>{sub.name}</span>
                        <span>
                            {sub.monthlyCost.toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                            })}
                        </span>
                    </li>
                ))}
            </ul>
            <hr className='my-2' />
            <div className='flex justify-between font-bold'>
                <span>Total récurrent :</span>
                <span>
                    {totalRecurring.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                    })}
                </span>
            </div>
        </div>
    );
};

export default SubscriptionsSection;
