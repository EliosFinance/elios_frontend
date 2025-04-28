import { MedalIcon } from 'lucide-react';

// components/EliCoinsCard.tsx
interface EliCoinsCardProps {
    coins: number;
    totalCoins: number;
}

const EliCoinsCard = ({ coins, totalCoins }: EliCoinsCardProps) => {
    const percentage = (coins / totalCoins) * 100;

    return (
        <div className='h-20 p-4 mb-4 bg-[--neutral-800] border border-solid border-[--neutral-500] rounded-lg flex flex-col justify-between'>
            <div className='flex items-center justify-between mb-2 gap-2'>
                <MedalIcon className='w-10 h-10 text-blue-500' />
                <div className='w-full h-full flex items-start justify-center flex-col'>
                    <span className='font-bold text-sm'>Mes EliCoins</span>
                    <h6 className='text-4xl'>
                        <b>{coins}</b>
                        <span className='text-[--neutral-500]'>/{totalCoins}</span>
                    </h6>
                </div>
            </div>
            <div className='h-2 bg-blue-200 rounded-full'>
                <div className='h-2 bg-blue-500 rounded-full' style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

export default EliCoinsCard;
