import CarouselChallenges from '@/components/challenge/CarouselChallenges';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PageLayout from '@/layout/PageLayout';
import { ChallengeType, challenges } from '@/temp/DefiData';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChallengePage() {
	const navigate = useNavigate();

	const featuredChallenge = challenges[0];
	const chartRef = useRef<HTMLDivElement | null>(null);

	const ongoing = challenges.filter((c) => c.userStatus === 'START');
	const completed = challenges.filter((c) => c.userStatus === 'COMPLETED');
	const notStarted = challenges.filter((c) => !c.userStatus || c.userStatus === 'DEFAULT');

	const handleNavigate = (challengeId: number) => {
		navigate(`/challenge/${challengeId}`);
	};

	useEffect(() => {
		if (chartRef.current) {
			const myChart = echarts.init(chartRef.current);
			const option = {
				tooltip: { trigger: 'axis' },
				xAxis: {
					type: 'category',
					data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						data: [50, 80, 120, 160, 220],
						type: 'line',
						smooth: true,
						areaStyle: {},
					},
				],
			};
			myChart.setOption(option);

			const handleResize = () => {
				myChart.resize();
			};

			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
				myChart.dispose();
			};
		}
	}, []);

	const renderChallengeCard = (challenge: ChallengeType) => {
		const percent = challenge.total ? Math.round((challenge.progress / challenge.total) * 100) : 0;

		return (
			<Card
				className='w-full h-full shadow-md cursor-pointer flex flex-col min-h-[220px]'
				onClick={() => handleNavigate(challenge.id)}
			>
				<CardHeader className='flex-grow-0 p-3'>
					<div className='relative w-full h-20 mb-2 overflow-hidden rounded'>
						<img
							src={challenge.backgroundImage}
							alt={challenge.title}
							className='object-cover w-full h-full'
						/>
					</div>
					<CardTitle className='font-bold line-clamp-1'>{challenge.title}</CardTitle>
					<CardDescription className='mt-1'>
						{challenge.userStatus === 'START' ? 'En cours' : 'À démarrer'}
					</CardDescription>
				</CardHeader>
				<div className='px-3 pb-3 mt-auto'>
					<Progress value={percent} className='w-full h-2' />
					<p className='mt-2'>
						{challenge.progress}/{challenge.total} ({percent}%)
					</p>
				</div>
			</Card>
		);
	};

	const renderCompletedCard = (challenge: ChallengeType) => (
		<Card
			className='w-full h-full shadow-md cursor-pointer flex flex-col min-h-[200px]'
			onClick={() => handleNavigate(challenge.id)}
		>
			<CardHeader className='flex-grow p-3'>
				<div className='relative w-full h-20 mb-2 overflow-hidden rounded'>
					<img src={challenge.backgroundImage} alt={challenge.title} className='object-cover w-full h-full' />
				</div>
				<CardTitle className='font-bold line-clamp-1'>{challenge.title}</CardTitle>
				<CardDescription className='mt-1 text-green-600'>Défi terminé !</CardDescription>
			</CardHeader>
			<div className='px-3 pb-3 mt-auto'>
				<div className='flex items-center justify-center h-8 text-green-600 text-md'>
					✓ Terminé
				</div>
			</div>
		</Card>
	);

	return (
		<PageLayout title='Défis'>
			<main className='flex flex-col w-full h-full pb-16 space-y-6'>
				{featuredChallenge && (
					<Card className='w-full shadow-sm'>
						<CardHeader className='p-4'>
							<CardTitle>Challenge vedette</CardTitle>
							<CardDescription className='mt-1'>{featuredChallenge.title}</CardDescription>
						</CardHeader>
						<div className='px-4'>
							<div ref={chartRef} className='w-full h-[250px]' />
						</div>
						<div className='flex justify-end p-4'>
							<Button variant='default' size='sm' onClick={() => handleNavigate(featuredChallenge.id)}>
								Voir le défi
							</Button>
						</div>
					</Card>
				)}

				{ongoing.length > 0 && (
					<div>
						<h2 className='mb-2 font-semibold'>Défis en cours</h2>
						<CarouselChallenges slides={ongoing} loop={true} renderItem={renderChallengeCard} />
					</div>
				)}

				{notStarted.length > 0 && (
					<div>
						<h2 className='mb-2 font-semibold'>Défis à démarrer</h2>
						<CarouselChallenges slides={notStarted} loop={true} renderItem={renderChallengeCard} />
					</div>
				)}

				{completed.length > 0 && (
					<div>
						<h2 className='mb-2 font-semibold'>Défis terminés</h2>
						<CarouselChallenges slides={completed} loop={true} renderItem={renderCompletedCard} />
					</div>
				)}
			</main>
		</PageLayout>
	);
}
