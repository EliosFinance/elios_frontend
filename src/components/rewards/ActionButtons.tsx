import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Button } from '../ui/button';
import { GiftIcon, UserPlusIcon, CurrencyEuroIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ActionButtons = () => {
	return (
		<div className='flex justify-between gap-2 mb-4'>
			<Button className='w-[48%] px-4 py-2 mr-2 h-12 text-white bg-blue-500 active:bg-blue-500 focus:bg-blue-500 rounded-lg text-sm'>Activité</Button>
			<Drawer>
				<DrawerTrigger asChild>
					<Button className='w-[48%] px-4 py-2 h-12 text-white bg-blue-500 active:bg-blue-500 focus:bg-blue-500 rounded-lg text-sm'>
						Comment ça marche
					</Button>
				</DrawerTrigger>
				<DrawerContent className="bg-[#181823] border-none h-[85vh] flex flex-col">
					<DrawerHeader className="relative flex-shrink-0 px-6 pt-2 pb-4">
						<DrawerTitle className="text-xl font-bold text-center text-white">Comment ça marche ?</DrawerTitle>
					</DrawerHeader>
					<div className='flex-1 min-h-0 px-6 pb-6 overflow-y-auto'>
						{/* Hero Section */}
						<div className='mb-6 text-center'>
							<div className='flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500'>
								<GiftIcon className='w-8 h-8 text-white' />
							</div>
							<p className='text-sm leading-relaxed text-gray-300'>Gagnez des Elicoins et débloquez des récompenses exclusives</p>
						</div>

						{/* Comment gagner des Elicoins */}
						<div className='mb-6'>
							<h3 className='flex items-center gap-2 mb-3 font-semibold text-white'>
								<StarIcon className='w-5 h-5 text-yellow-400' />
								Comment gagner des Elicoins
							</h3>
							<div className='grid grid-cols-2 gap-3'>
								<div className='p-3 border rounded-lg bg-white/5 border-white/10'>
									<div className='text-center'>
										<div className='flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-green-500/20'>
											<span className='text-sm font-bold text-green-400'>+10</span>
										</div>
										<p className='text-xs font-medium text-white'>Connexion quotidienne</p>
									</div>
								</div>
								<div className='p-3 border rounded-lg bg-white/5 border-white/10'>
									<div className='text-center'>
										<div className='flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-blue-500/20'>
											<span className='text-sm font-bold text-blue-400'>+25</span>
										</div>
										<p className='text-xs font-medium text-white'>Compléter un quiz</p>
									</div>
								</div>
								<div className='p-3 border rounded-lg bg-white/5 border-white/10'>
									<div className='text-center'>
										<div className='flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-purple-500/20'>
											<span className='text-sm font-bold text-purple-400'>+50</span>
										</div>
										<p className='text-xs font-medium text-white'>Finir un défi</p>
									</div>
								</div>
								<div className='p-3 border rounded-lg bg-white/5 border-white/10'>
									<div className='text-center'>
										<div className='flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-orange-500/20'>
											<span className='text-sm font-bold text-orange-400'>+100</span>
										</div>
										<p className='text-xs font-medium text-white'>Parrainer un ami</p>
									</div>
								</div>
							</div>
						</div>

						{/* Système de parrainage */}
						<div className='mb-6'>
							<h3 className='flex items-center gap-2 mb-3 font-semibold text-white'>
								<UserPlusIcon className='w-5 h-5 text-blue-400' />
								Parrainage
							</h3>
							<div className='p-4 border rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20'>
								<div className='flex items-center justify-between mb-2'>
									<span className='text-sm font-medium text-white'>Vous gagnez</span>
									<span className='text-lg font-bold text-blue-400'>+100 Elicoins</span>
								</div>
								<div className='flex items-center justify-between'>
									<span className='text-sm font-medium text-white'>Votre ami gagne</span>
									<span className='text-lg font-bold text-green-400'>+50 Elicoins</span>
								</div>
								<p className='mt-3 text-xs text-center text-gray-300'>Quand votre ami s'inscrit avec votre code</p>
							</div>
						</div>

						{/* Récompenses */}
						<div>
							<h3 className='flex items-center gap-2 mb-3 font-semibold text-white'>
								<CurrencyEuroIcon className='w-5 h-5 text-yellow-400' />
								Échanger vos Elicoins
							</h3>
							<div className='grid grid-cols-3 gap-2'>
								<div className='p-3 text-center border rounded-lg bg-white/5 border-white/10'>
									<div className='mb-1 text-sm font-bold text-yellow-400'>500</div>
									<div className='text-xs text-white'>5€ Amazon</div>
								</div>
								<div className='p-3 text-center border rounded-lg bg-white/5 border-white/10'>
									<div className='mb-1 text-sm font-bold text-yellow-400'>1000</div>
									<div className='text-xs text-white'>10€ PayPal</div>
								</div>
								<div className='p-3 text-center border rounded-lg bg-white/5 border-white/10'>
									<div className='mb-1 text-sm font-bold text-yellow-400'>2000</div>
									<div className='text-xs text-white'>1 mois Premium</div>
								</div>
							</div>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default ActionButtons;
