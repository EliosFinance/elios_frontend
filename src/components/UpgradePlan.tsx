import B4 from '@/assets/images/corp/B4.webp';
import CheckoutButton from '@/stripe/checkoutButton';
import { CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Subscription = () => {
	const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

	const features = [
		'Analyses IA avancées et prédictives',
		'Support prioritaire 24/7',
		'Alertes intelligentes personnalisées',
		'Conseils financiers sur mesure',
		'Rapports détaillés illimités',
		'Accès anticipé aux nouvelles fonctions'
	];

	return (
		<div className='flex flex-col w-full bg-[#181823] h-[85vh] overflow-hidden'>
			{/* Hero section avec image et blur progressif étendu */}
			<div className='relative h-64 mb-5 overflow-hidden'>
				<img src={B4} alt='Premium' className='absolute inset-0 object-cover w-full h-full scale-105' />
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[#181823]/30 via-[#181823]/60 to-[#181823]' />
				<div className='absolute inset-x-0 bottom-0 pb-8 text-center'>
					<h1 className='mb-2 text-3xl font-bold text-white drop-shadow-lg'>Elios Premium</h1>
					<p className='text-sm text-slate-100 drop-shadow-md'>Libérez votre potentiel financier</p>
				</div>
			</div>

			<div className='flex flex-col flex-1 px-6'>
				{/* Avantages */}
				<div className='mb-5'>
					<div className='grid grid-cols-2 gap-2'>
						{features.map((feature, index) => (
							<div key={index} className='flex items-center gap-2 p-2.5 bg-gradient-to-br from-white/8 to-white/4 rounded-lg border border-white/10 backdrop-blur-sm'>
								<CheckCircleIcon className='flex-shrink-0 w-4 h-4 text-emerald-400' />
								<span className='text-xs font-medium leading-tight text-white'>{feature}</span>
							</div>
						))}
					</div>
				</div>

				{/* Plans de tarification */}
				<div className='mb-5 space-y-3'>
					{/* Plan Annuel */}
					<Card
						className={`cursor-pointer transition-all duration-200 ${selectedPlan === 'annual'
								? 'ring-2 ring-primary-500 bg-primary-500/10'
								: 'border border-slate-600 bg-white/5'
							}`}
						onClick={() => setSelectedPlan('annual')}
					>
						<CardContent className='p-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-3'>
									<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'annual' ? 'border-primary-500 bg-primary-500' : 'border-slate-400'
										}`}>
										{selectedPlan === 'annual' && <div className='w-2 h-2 bg-white rounded-full' />}
									</div>
									<div>
										<div className='flex items-center gap-2'>
											<span className='font-semibold text-white'>Annuel</span>
											<span className='px-2 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r from-amber-500 to-orange-500'>-35%</span>
										</div>
										<p className='text-xs text-slate-400'>Le plus avantageux</p>
									</div>
								</div>
								<div className='text-right'>
									<div className='flex items-baseline gap-1'>
										<span className='text-xl font-bold text-white'>47,99€</span>
										<span className='text-sm line-through text-slate-500'>59,99€</span>
									</div>
									<p className='text-xs text-slate-400'>4€/mois</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Plan Mensuel */}
					<Card
						className={`cursor-pointer transition-all duration-200 ${selectedPlan === 'monthly'
								? 'ring-2 ring-primary-500 bg-primary-500/10'
								: 'border border-slate-600 bg-white/5'
							}`}
						onClick={() => setSelectedPlan('monthly')}
					>
						<CardContent className='p-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-3'>
									<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'monthly' ? 'border-primary-500 bg-primary-500' : 'border-slate-400'
										}`}>
										{selectedPlan === 'monthly' && <div className='w-2 h-2 bg-white rounded-full' />}
									</div>
									<div>
										<span className='font-semibold text-white'>Mensuel</span>
										<p className='text-xs text-slate-400'>Maximum de flexibilité</p>
									</div>
								</div>
								<div className='text-right'>
									<span className='text-xl font-bold text-white'>4,99€</span>
									<p className='text-xs text-slate-400'>/mois</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Garantie */}
				<div className='mb-6 text-center'>
					<div className='flex items-center justify-center gap-2 mb-1 text-emerald-400'>
						<ShieldCheckIcon className='w-4 h-4' />
						<span className='text-xs font-medium'>Garantie 30 jours</span>
					</div>
					<p className='text-xs text-slate-500'>Résiliable à tout moment</p>
				</div>

				{/* CTA */}
				<div className='pb-6 mt-auto'>
					<CheckoutButton plan={selectedPlan as 'annual' | 'monthly'} />
				</div>
			</div>
		</div>
	);
};

export default Subscription;
