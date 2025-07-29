import ActionButtons from '@/components/rewards/ActionButtons';
import CopyAlert from '@/components/rewards/CopyAlert';
import EliCoinsCard from '@/components/rewards/EliCoinsCard';
import ReferralSection from '@/components/rewards/ReferralSection';
import RewardsSection from '@/components/rewards/RewardsSection';
import PageLayout from '@/layout/PageLayout';
import { useState } from 'react';
import { SparklesIcon } from 'lucide-react';

const Rewards = () => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard
			.writeText('elios.me/username-id')
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			})
			.catch((err) => console.error('Erreur de copie:', err));
	};

	return (
		<PageLayout title='Récompenses'>
			{/* Alert de copie avec animation améliorée */}
			{copied && (
				<div className='fixed z-50 duration-300 transform -translate-x-1/2 top-4 left-1/2 animate-in slide-in-from-top-2'>
					<CopyAlert />
				</div>
			)}

			{/* Header avec icône et description */}
			<div className='flex items-start gap-3 mb-6'>
				<div className='flex items-center justify-center flex-shrink-0 w-12 h-12 shadow-lg rounded-xl bg-gradient-to-br from-primary-500 to-primary-600'>
					<SparklesIcon className='w-6 h-6 text-white' />
				</div>
				<div className='flex-1'>
					<h2 className='mb-1 text-xl font-bold text-white'>Gagnez des récompenses</h2>
					<p className='text-sm leading-relaxed text-gray-400'>Invitez vos amis, accomplissez des défis et gagnez des EliCoins pour débloquer des récompenses exclusives.</p>
				</div>
			</div>

			{/* Section EliCoins - Position prioritaire */}
			<EliCoinsCard coins={125} totalCoins={500} />

			{/* Boutons d'action */}
			<ActionButtons />

			{/* Section de parrainage avec header amélioré */}
			<div className='mb-6'>
				<div className='flex items-center gap-2 mb-4'>
					<SparklesIcon className='w-5 h-5 text-primary-400' />
					<h3 className='text-lg font-bold text-white'>Programme de parrainage</h3>
				</div>
				<ReferralSection onCopy={handleCopy} />
			</div>

			{/* Section des récompenses */}
			<RewardsSection />

			{/* Footer avec informations complémentaires */}
			<div className='p-4 mt-6 border rounded-lg bg-white/5 border-white/10 backdrop-blur-sm'>
				<div className='text-center'>
					<p className='mb-1 text-sm font-medium text-gray-300'>💡 Astuce</p>
					<p className='text-xs leading-relaxed text-gray-400'>
						Connectez-vous quotidiennement et complétez vos défis pour maximiser vos gains d'EliCoins !
					</p>
				</div>
			</div>
		</PageLayout>
	);
};

export default Rewards;
