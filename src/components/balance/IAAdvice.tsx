import { instance_back } from '@/api/const';
import { userStore } from '@/store/UserStore';
import React, { useEffect, useState } from 'react';

const IAAdvice: React.FC = () => {
    const [advice, setAdvice] = useState<string>('');

    useEffect(() => {
        async function fetchAdvice() {
            try {
                const headers = userStore.getState().getAuth();
                const response = await instance_back.get('powens/ia-advice', { headers });
                setAdvice(response.data.advice);
            } catch (error) {
                console.error('Erreur lors de la récupération des conseils IA:', error);
                setAdvice('Analysez vos dépenses récurrentes pour optimiser votre budget.');
            }
        }
        fetchAdvice();
    }, []);

    return (
        <div className='p-4 my-4 rounded shadow bg-blue-50'>
            <h2 className='text-xl font-bold'>Conseils IA</h2>
            <p className='mt-2 text-sm text-gray-800'>{advice}</p>
        </div>
    );
};

export default IAAdvice;
