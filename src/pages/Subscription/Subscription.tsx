import { Card } from '@/components/ui/card';
import PageLayout from '@/layout/PageLayout';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DribblePro from '../../assets/images/icons/dribblepro_icon.png';
import SlackIcon from '../../assets/images/icons/slack_icon.png';
import SpotifyIcon from '../../assets/images/icons/spotify_icon.png';

const Subscription = () => {
	const navigate = useNavigate();
	const [period, setPeriod] = useState('Monthly');
	const [isVisible, setIsVisible] = useState(true);
	const [chartData, _setChartData] = useState({
		Monthly: { xAxis: ['Octobre', 'Novembre', 'Décembre'], series: [820, 932, 901] },
		Weekly: { xAxis: ['Semaine 1', 'Semaine 2', 'Semaine 3'], series: [300, 450, 600] },
	});

	const [expensesData, _setExpensesData] = useState({
		Monthly: [
			{
				icon: <img src={DribblePro} alt='Dribbble Pro' className='w-5 h-5' />,
				name: 'Dribbble Pro',
				amount: '$160',
			},
			{ icon: <img src={SpotifyIcon} alt='Spotify' className='w-5 h-5' />, name: 'Spotify', amount: '$160' },
			{ icon: <img src={SlackIcon} alt='Slack' className='w-5 h-5' />, name: 'Slack', amount: '$160' },
			{
				icon: <img src={DribblePro} alt='Dribbble Pro' className='w-5 h-5' />,
				name: 'Dribbble Pro',
				amount: '$160',
			},
			{ icon: <img src={SpotifyIcon} alt='Spotify' className='w-5 h-5' />, name: 'Spotify', amount: '$160' },
			{ icon: <img src={SlackIcon} alt='Slack' className='w-5 h-5' />, name: 'Slack', amount: '$160' },
		],
		Weekly: [
			{
				icon: <img src={DribblePro} alt='Dribbble Pro' className='w-5 h-5' />,
				name: 'Dribbble Pro',
				amount: '$40',
			},
			{ icon: <img src={SpotifyIcon} alt='Spotify' className='w-5 h-5' />, name: 'Spotify', amount: '$40' },
			{ icon: <img src={SlackIcon} alt='Slack' className='w-5 h-5' />, name: 'Slack', amount: '$40' },
			{
				icon: <img src={DribblePro} alt='Dribbble Pro' className='w-5 h-5' />,
				name: 'Dribbble Pro',
				amount: '$40',
			},
			{ icon: <img src={SpotifyIcon} alt='Spotify' className='w-5 h-5' />, name: 'Spotify', amount: '$40' },
			{ icon: <img src={SlackIcon} alt='Slack' className='w-5 h-5' />, name: 'Slack', amount: '$40' },
		],
	});

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const chartOptions = {
		xAxis: { type: 'category', data: chartData[period].xAxis },
		yAxis: { type: 'value' },
		series: [{ data: chartData[period].series, type: 'line', smooth: true }],
	};

	return (
		<PageLayout 
			title="Abonnements" 
			onBack={() => navigate(-1)}
		>
			{/* Header avec toggle visibilité */}
			<div className='flex items-center justify-end w-full mb-6'>
				<button
					onClick={toggleVisibility}
					className='p-2 transition-colors rounded-full hover:bg-gray-800/50'
					aria-label={isVisible ? 'Masquer les montants' : 'Afficher les montants'}
				>
					{isVisible ? (
						<EyeIcon className='w-5 h-5 text-gray-400' />
					) : (
						<EyeSlashIcon className='w-5 h-5 text-gray-400' />
					)}
				</button>
			</div>

			{/* Card Evolution globale */}
			<Card className='w-full p-4 mb-6 border bg-white/5 border-white/10 backdrop-blur-sm'>
				<div className='flex items-center justify-between mb-4'>
					<div>
						<h2 className='mb-1 text-lg font-semibold text-white'>Évolution des abonnements</h2>
						<p className='text-sm text-gray-400'>Novembre 2024</p>
					</div>
					<div className='flex items-center gap-2'>
						<span className='text-sm text-gray-400'>Période :</span>
						<select
							className='px-3 py-2 text-sm text-white border rounded-lg bg-white/5 border-white/20 focus:border-primary-500 focus:outline-none'
							value={period}
							onChange={(e) => setPeriod(e.target.value)}
						>
							<option value='Monthly'>Mensuel</option>
							<option value='Weekly'>Hebdomadaire</option>
						</select>
					</div>
				</div>
				
				<div className='mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg'>
					<p className='text-sm text-orange-400 font-medium mb-1'>⚠️ Prochain paiement</p>
					<p className='text-sm text-gray-300'>
						Spotify Premium - 
						<span className={`font-semibold text-white ${!isVisible ? 'blur-sm' : ''}`}>
							9,99€
						</span>
						<span className='text-orange-400 ml-2'>dans 3 jours</span>
					</p>
				</div>
				
				<div className={`${!isVisible ? 'blur-sm' : ''}`}>
					{isVisible && <ReactECharts option={chartOptions} className='w-full h-48' />}
				</div>
			</Card>

			{/* Section dépenses récurrentes */}
			<div className='mb-4'>
				<h2 className='mb-1 text-lg font-semibold text-white'>Vos abonnements actifs</h2>
				<p className='mb-4 text-sm text-gray-400'>6 abonnements • Total mensuel : <span className={`font-medium text-white ${!isVisible ? 'blur-sm' : ''}`}>89,94€</span></p>
			</div>

			{/* Grid des dépenses */}
			<div className='space-y-3'>
				{expensesData[period].map((expense, index) => (
					<Card key={index} className='flex items-center justify-between w-full p-4 transition-colors border bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10'>
						<div className='flex items-center'>
							<div className='flex items-center justify-center mr-4 border w-12 h-12 bg-gray-700/50 rounded-xl border-white/10'>
								{expense.icon}
							</div>
							<div>
								<span className='font-medium text-white'>{expense.name}</span>
								<p className='text-xs text-gray-400'>Abonnement mensuel</p>
							</div>
						</div>
						<div className='text-right'>
							<p className={`font-semibold text-white ${!isVisible ? 'blur-sm' : ''}`}>
								{expense.amount}
							</p>
							<p className='text-xs text-gray-400'>par mois</p>
						</div>
					</Card>
				))}
			</div>
		</PageLayout>
	);
};

export default Subscription;
