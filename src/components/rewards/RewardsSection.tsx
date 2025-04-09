// components/RewardsSection.tsx
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import RewardCard from './RewardCard';

const RewardsSection = () => {
    // Vous pourriez remplacer ceci par des données réelles
    const rewards = [
        {
            id: 1,
            title: '5% sur votre prochaine commande',
            progress: 50,
            imageUrl:
                'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==',
        },
        {
            id: 2,
            title: '5% sur votre prochaine commande',
            progress: 50,
            imageUrl:
                'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==',
        },
        {
            id: 3,
            title: '5% sur votre prochaine commande',
            progress: 50,
            imageUrl:
                'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==',
        },
        {
            id: 4,
            title: '5% sur votre prochaine commande',
            progress: 50,
            imageUrl:
                'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==',
        },
    ];

    return (
        <>
            <div className='flex items-center justify-between mb-2'>
                <h3 className='text-lg font-bold'>
                    Récompenses <InformationCircleIcon className='inline w-4 h-4' />
                </h3>
                <span className='text-blue-500 cursor-pointer'>Voir tout</span>
            </div>

            {rewards.map((reward) => (
                <RewardCard
                    key={reward.id}
                    title={reward.title}
                    progress={reward.progress}
                    imageUrl={reward.imageUrl}
                />
            ))}
        </>
    );
};

export default RewardsSection;
