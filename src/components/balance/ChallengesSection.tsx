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
        <div className='p-4 my-4 rounded shadow bg-purple-50'>
            <h2 className='text-xl font-bold'>Défis</h2>
            <ul className='mt-2'>
                {challenges.map((challenge) => (
                    <li key={challenge.id} className='p-2 mb-2 border rounded'>
                        <h3 className='font-semibold'>{challenge.title}</h3>
                        <p className='text-sm text-gray-700'>{challenge.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChallengesSection;
