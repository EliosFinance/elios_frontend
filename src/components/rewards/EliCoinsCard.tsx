import { CoinsIcon, TrendingUpIcon, SparklesIcon } from 'lucide-react';

interface EliCoinsCardProps {
	coins: number;
	totalCoins: number;
}

const EliCoinsCard = ({ coins, totalCoins }: EliCoinsCardProps) => {
	const percentage = (coins / totalCoins) * 100;

	return (
		<div className='relative p-5 mb-4 overflow-hidden rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm'>
			{/* Decorative elements */}
			<div className='absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary-500/10 to-transparent blur-lg transform translate-x-8 -translate-y-8' />
			<div className='absolute bottom-0 left-0 w-16 h-16 rounded-full bg-gradient-to-tr from-primary-400/10 to-transparent blur-md transform -translate-x-8 translate-y-8' />
			
			<div className='relative z-10'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center gap-3'>
						<div className='flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg'>
							<CoinsIcon className='w-7 h-7 text-white' />
						</div>
						<div>
							<p className='text-sm font-medium text-gray-300'>Mes EliCoins</p>
							<div className='flex items-center gap-2'>
								<h2 className='text-2xl font-bold text-white'>{coins.toLocaleString()}</h2>
								<SparklesIcon className='w-5 h-5 text-primary-400 animate-pulse' />
							</div>
						</div>
					</div>
					<div className='flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10'>
						<TrendingUpIcon className='w-4 h-4 text-green-400' />
						<span className='text-xs font-medium text-green-400'>+12%</span>
					</div>
				</div>
				
				<div className='space-y-2'>
					<div className='flex items-center justify-between text-sm'>
						<span className='text-gray-400'>Progression vers le prochain palier</span>
						<span className='font-medium text-primary-400'>{percentage.toFixed(0)}%</span>
					</div>
					<div className='relative'>
						<div className='h-3 bg-gray-800/60 rounded-full overflow-hidden'>
							<div 
								className='h-full bg-primary-500 rounded-full transition-all duration-1000 ease-out relative'
								style={{ width: `${percentage}%` }}
							>
								<div className='absolute inset-0 bg-white/20 rounded-full animate-pulse' />
							</div>
						</div>
						<div className='flex justify-between mt-1 text-xs text-gray-500'>
							<span>0</span>
							<span>{totalCoins.toLocaleString()}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EliCoinsCard;
