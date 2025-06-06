import { MedalIcon } from 'lucide-react';

interface EliCoinsCardProps {
	coins: number;
	totalCoins: number;
}

const EliCoinsCard = ({ coins, totalCoins }: EliCoinsCardProps) => {
	const percentage = (coins / totalCoins) * 100;

	return (
		<div className='h-20 p-4 mb-4 bg-[--neutral-800] border border-solid border-[--neutral-500] rounded-lg flex flex-col justify-between'>
			<div className='flex items-center justify-start gap-6 mb-2'>
				<MedalIcon className='w-10 h-10 text-blue-500' />
				<div className='flex flex-col items-start justify-center w-auto h-full'>
					<span className='font-bold'>Mes EliCoins</span>
					<h4>
						<b>{coins}</b>
						<span className='text-[--neutral-500]'>/{totalCoins}</span>
					</h4>
				</div>
			</div>
			<div className='h-2 bg-blue-200 rounded-full'>
				<div className='h-2 bg-blue-500 rounded-full' style={{ width: `${percentage}%` }}></div>
			</div>
		</div>
	);
};

export default EliCoinsCard;
