import { useUserRewards } from '@/store/userRewards';
import { ChevronRightIcon, TrophyIcon, GiftIcon, SparklesIcon } from 'lucide-react';
import RewardCard from './RewardCard';
import { Button } from '../ui/button';

const RewardsSection = () => {
  // Données enrichies avec plus de variété
  const rewards = [
    {
      id: 1,
      title: 'Première transaction effectuée',
      progress: 100,
      coins: 25,
      isCompleted: false,
      imageUrl: '',
    },
    {
      id: 2,
      title: 'Connectez votre compte bancaire',
      progress: 100,
      coins: 50,
      isCompleted: true,
      imageUrl: '',
    },
    {
      id: 3,
      title: 'Terminez votre premier quiz',
      progress: 75,
      coins: 30,
      isCompleted: false,
      imageUrl: '',
    },
    {
      id: 4,
      title: 'Invitez 3 amis sur Elios',
      progress: 33,
      coins: 150,
      isCompleted: false,
      imageUrl: '',
    },
    {
      id: 5,
      title: 'Économisez 100€ ce mois-ci',
      progress: 45,
      coins: 100,
      isCompleted: false,
      imageUrl: '',
    },
  ];

  const completedRewards = rewards.filter(r => r.isCompleted).length;
  const availableRewards = rewards.filter(r => r.progress >= 100 && !r.isCompleted).length;

  return (
    <div className='rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4 mb-6'>
      {/* Header avec statistiques */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-2'>
            <TrophyIcon className='w-5 h-5 text-primary-400' />
            <h3 className='text-lg font-bold text-white'>Récompenses</h3>
          </div>
          <div className='flex items-center gap-3 text-xs'>
            <div className='flex items-center gap-1'>
              <div className='w-2 h-2 bg-green-500 rounded-full' />
              <span className='text-gray-400'>{completedRewards} terminées</span>
            </div>
            <div className='flex items-center gap-1'>
              <div className='w-2 h-2 bg-primary-500 rounded-full animate-pulse' />
              <span className='text-gray-400'>{availableRewards} disponibles</span>
            </div>
          </div>
        </div>
        <Button 
          variant='ghost' 
          className='flex items-center gap-1 text-primary-400 hover:text-primary-300 hover:bg-white/5 p-2 text-sm flex-shrink-0'
        >
          Voir tout
          <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>

      {/* Progress overview */}
      {availableRewards > 0 && (
        <div className='p-3 mb-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex-shrink-0'>
              <SparklesIcon className='w-4 h-4 text-green-400' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='font-medium text-white text-sm'>🎉 Récompenses prêtes !</p>
              <p className='text-xs text-gray-400'>Vous avez {availableRewards} récompense{availableRewards > 1 ? 's' : ''} à récupérer</p>
            </div>
            <Button className='rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:bg-white/10 text-xs px-3 py-1 flex-shrink-0'>
              Récupérer
            </Button>
          </div>
        </div>
      )}

      {/* Rewards list */}
      <div className='space-y-3'>
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            title={reward.title}
            progress={reward.progress}
            imageUrl={reward.imageUrl}
            coins={reward.coins}
            isCompleted={reward.isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default RewardsSection;
