// Rewards.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/rewards/Header';
import ReferralSection from '@/components/rewards/ReferralSection';
import EliCoinsCard from '@/components/rewards/EliCoinsCard';
import ActionButtons from '@/components/rewards/ActionButtons';
import RewardsSection from '@/components/rewards/RewardsSection';
import CopyAlert from '@/components/rewards/CopyAlert';

const Rewards = () => {
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard
			.writeText("elios.me/username-id")
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			})
			.catch((err) => console.error("Erreur de copie:", err));
	};

	return (
		<div className="flex flex-col items-center w-full px-6 pb-24">
			{copied && <CopyAlert />}

			<Header
				title="Récompenses"
				onBack={() => navigate(-1)}
			/>

			<section className="w-full mt-6">
				<h3 className="mb-4 text-lg font-bold">Parrainez vos amis &amp; gagnez 100 points</h3>

				<ReferralSection onCopy={handleCopy} />

				<EliCoinsCard coins={125} totalCoins={500} />

				<ActionButtons />

				<RewardsSection />
			</section>
		</div>
	);
};

export default Rewards;