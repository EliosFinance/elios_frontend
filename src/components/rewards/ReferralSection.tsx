import { CheckIcon, CopyIcon, ShareIcon, UsersIcon, GiftIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface ReferralSectionProps {
  onCopy: () => void;
}

const ReferralSection = ({ onCopy }: ReferralSectionProps) => {
  const [coolDownOn, setCoolDownOn] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCoolDownOn(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [coolDownOn]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText('elios.me/username-id')
      .then(() => {
        setCoolDownOn(true);
        onCopy();
      })
      .catch((err) => console.error('Erreur de copie:', err));
  };

  return (
    <div className='rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-5 mb-6'>
      {/* Header avec icônes et stats */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600'>
            <UsersIcon className='w-5 h-5 text-white' />
          </div>
          <div>
            <p className='text-sm font-medium text-white'>Invitez vos amis</p>
            <p className='text-xs text-gray-400'>Gagnez 100 EliCoins par ami</p>
          </div>
        </div>
        <div className='flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10'>
          <GiftIcon className='w-4 h-4 text-primary-400' />
          <span className='text-xs font-medium text-primary-400'>+100</span>
        </div>
      </div>

      {/* Section de partage */}
      <div className='mb-4'>
        <p className='text-sm font-medium text-gray-300 mb-3'>Votre code de parrainage</p>
        
        {/* Input avec design moderne */}
        <div className='relative mb-4'>
          <div 
            className='flex items-center w-full p-4 rounded-lg bg-gray-900/40 border border-gray-600/30 cursor-pointer transition-all duration-200 hover:border-primary-500/50 hover:bg-gray-900/60'
            onClick={handleCopy}
          >
            <span className='flex-1 text-white font-mono text-sm'>elios.me/username-id</span>
            <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary-500/20 transition-all duration-200'>
              {coolDownOn ? (
                <CheckIcon className='w-4 h-4 text-green-400' />
              ) : (
                <CopyIcon className='w-4 h-4 text-primary-400' />
              )}
            </div>
          </div>
          {coolDownOn && (
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping' />
          )}
        </div>

        {/* Boutons d'action */}
        <div className='grid grid-cols-2 gap-3 mb-4'>
          <Button
            onClick={handleCopy}
            className='flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-200'
          >
            <CopyIcon className='w-4 h-4' />
            Copier
          </Button>
          <Button
            onClick={() => alert('TODO: share with friends')}
            className='flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-200'
          >
            <ShareIcon className='w-4 h-4' />
            Partager
          </Button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className='grid grid-cols-3 gap-3'>
        <div className='p-3 rounded-lg bg-white/5 border border-white/10 text-center'>
          <p className='text-lg font-bold text-green-400'>3</p>
          <p className='text-xs text-gray-400'>Amis invités</p>
        </div>
        <div className='p-3 rounded-lg bg-white/5 border border-white/10 text-center'>
          <p className='text-lg font-bold text-blue-400'>1</p>
          <p className='text-xs text-gray-400'>Inscrit</p>
        </div>
        <div className='p-3 rounded-lg bg-white/5 border border-white/10 text-center'>
          <p className='text-lg font-bold text-purple-400'>100</p>
          <p className='text-xs text-gray-400'>Coins gagnés</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralSection;
