import { Button } from '../ui/button';
import { GiftIcon, TrophyIcon, LockIcon, CheckCircleIcon } from 'lucide-react';

interface RewardCardProps {
    title: string;
    progress: number;
    imageUrl: string;
    coins?: number;
    isCompleted?: boolean;
}

const RewardCard = ({ title, progress, imageUrl, coins = 50, isCompleted = false }: RewardCardProps) => {
    const canClaim = progress >= 100;
    
    return (
        <div className='group relative p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300'>
            {/* Background decorative elements */}
            <div className='absolute top-0 right-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/5 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            
            <div className='flex items-start gap-3'>
                {/* Reward Icon/Image */}
                <div className='relative flex-shrink-0'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 overflow-hidden'>
                        {imageUrl ? (
                            <img src={imageUrl} alt='Reward' className='w-6 h-6 object-cover rounded-lg' />
                        ) : (
                            <GiftIcon className='w-5 h-5 text-primary-400' />
                        )}
                    </div>
                    {isCompleted && (
                        <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center'>
                            <CheckCircleIcon className='w-2.5 h-2.5 text-white' />
                        </div>
                    )}
                </div>
                
                {/* Content */}
                <div className='flex-1 min-w-0'>
                    {/* Title and badge */}
                    <div className='flex items-start justify-between gap-2 mb-2'>
                        <h3 className='font-medium text-white text-sm leading-tight flex-1'>{title}</h3>
                        {canClaim && !isCompleted && (
                            <div className='flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 flex-shrink-0'>
                                <TrophyIcon className='w-3 h-3 text-green-400' />
                                <span className='text-xs font-medium text-green-400'>Prêt</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Progress bar */}
                    <div className='space-y-1'>
                        <div className='flex items-center justify-between text-xs'>
                            <span className='text-gray-400'>Progression</span>
                            <span className='font-medium text-primary-400'>{Math.min(progress, 100)}%</span>
                        </div>
                        <div className='relative'>
                            <div className='h-2 bg-gray-800/60 rounded-full overflow-hidden'>
                                <div 
                                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                                        canClaim 
                                            ? 'bg-green-500' 
                                            : 'bg-primary-500'
                                    }`}
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                >
                                    {canClaim && (
                                        <div className='absolute inset-0 bg-white/20 rounded-full animate-pulse' />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Reward value */}
                    <div className='flex items-center gap-1 mt-2'>
                        <GiftIcon className='w-3 h-3 text-primary-400' />
                        <span className='text-xs font-medium text-primary-400'>+{coins} EliCoins</span>
                    </div>
                </div>
                
                {/* Action Button */}
                <div className='flex-shrink-0'>
                    {isCompleted ? (
                        <Button 
                            disabled
                            className='px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed text-xs'
                        >
                            Récupéré
                        </Button>
                    ) : canClaim ? (
                        <Button 
                            className='px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-200 text-xs font-medium'
                        >
                            Récupérer
                        </Button>
                    ) : (
                        <Button 
                            disabled
                            className='flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed text-xs'
                        >
                            <LockIcon className='w-3 h-3' />
                            Locked
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RewardCard;
