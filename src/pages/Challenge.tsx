import { useGetChallenges } from '@/api';
import CarouselChallenges from '@/components/challenge/CarouselChallenges';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthProvider';
import PageLayout from '@/layout/PageLayout';
import { challengeType } from '@/types/challengeType';
import * as echarts from 'echarts';
import { ActivityIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChallengePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [challenges, setChallenges] = useState<challengeType[]>([]);
    const [featuredChallenge, setFeaturedChallenge] = useState<challengeType | null>(null);
    const [onGoingChallenges, setOngoingChallenges] = useState<challengeType[]>([]);
    const [completedChallenges, setCompletedChallenges] = useState<challengeType[]>([]);
    const [notStartedChallenges, setNotStartedChallenges] = useState<challengeType[]>([]);

    const { data, isLoading, isError } = useGetChallenges();

    useEffect(() => {
        console.log(data);
        if (data) {
            setChallenges(data);

            setFeaturedChallenge(data[0]);
            setOngoingChallenges(
                data.filter((challenge) =>
                    challenge.userToChallenge.some(
                        (utc) =>
                            utc.user.username === user.username &&
                            (utc.currentState === 'START' || utc.currentState === 'PROGRESS'),
                    ),
                ),
            );
            setCompletedChallenges(
                data.filter((challenge) =>
                    challenge.userToChallenge.some(
                        (utc) =>
                            utc.user.username === user.username &&
                            (utc.currentState === 'REWARD_TO_CLAIM' ||
                                utc.currentState === 'REWARD_CLAIMED' ||
                                utc.currentState === 'END'),
                    ),
                ),
            );
            setNotStartedChallenges(
                data.filter(
                    (challenge) => !challenge.userToChallenge.some((utc) => utc.user.username === user.username),
                ),
            );
        }
    }, [data, user]);

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

    const renderChallengeCard = (challenge: challengeType) => {
        // const percent = challenge.total ? Math.round((challenge.progress / challenge.total) * 100) : 0;

        return (
            <Card
                className='w-full h-full shadow-md cursor-pointer flex flex-col min-h-[220px]'
                onClick={() => handleNavigate(challenge.id)}
            >
                <CardHeader className='flex-grow-0 p-3'>
                    <div className='relative w-full h-20 mb-2 overflow-hidden rounded'>
                        <img src={challenge.image} alt={challenge.title} className='object-cover w-full h-full' />
                    </div>
                    <CardTitle className='font-bold line-clamp-1'>{challenge.title}</CardTitle>
                    <CardDescription className='mt-1'>
                        {['START', 'PROGRESS'].includes(
                            challenge.userToChallenge.filter((c) => c.user.username === user.username)[0]
                                ?.currentState ?? '',
                        )
                            ? 'En cours'
                            : 'À démarrer'}
                    </CardDescription>
                </CardHeader>
                {/* <div className='px-3 pb-3 mt-auto'>
					<Progress value={percent} className='w-full h-2' />
					<p className='mt-2'>
						{challenge.progress}/{challenge.total} ({percent}%)
					</p>
				</div> */}
            </Card>
        );
    };

    const renderCompletedCard = (challenge: challengeType) => (
        <Card
            className='w-full h-full shadow-md cursor-pointer flex flex-col min-h-[200px]'
            onClick={() => handleNavigate(challenge.id)}
        >
            <CardHeader className='flex-grow p-3'>
                <div className='relative w-full h-20 mb-2 overflow-hidden rounded'>
                    <img src={challenge.image} alt={challenge.title} className='object-cover w-full h-full' />
                </div>
                <CardTitle className='font-bold line-clamp-1'>{challenge.title}</CardTitle>
                <CardDescription className='mt-1 text-green-600'>Défi terminé !</CardDescription>
            </CardHeader>
            <div className='px-3 pb-3 mt-auto'>
                <div className='flex items-center justify-center h-8 text-green-600 text-md'>✓ Terminé</div>
            </div>
        </Card>
    );

    return (
        <PageLayout title='Défis'>
            <div className='flex items-start gap-3 mb-6'>
                <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 shadow-lg rounded-xl bg-gradient-to-br from-primary-500 to-primary-600'>
                    <ActivityIcon className='w-6 h-6 text-white' />
                </div>
                <div className='flex-1'>
                    <h2 className='mb-1 text-xl font-bold text-white'>Gérez vos défis</h2>
                    <p className='text-sm leading-relaxed text-gray-400'>
                        Suivez vos dépenses, analysez vos habitudes et optimisez votre budget mensuel.
                    </p>
                </div>
            </div>
            {isLoading && <p className='text-gray-500'>Chargement des défis...</p>}
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

                {onGoingChallenges.length > 0 && (
                    <div>
                        <h2 className='mb-2 font-semibold'>Défis en cours</h2>
                        <CarouselChallenges slides={onGoingChallenges} loop={true} renderItem={renderChallengeCard} />
                    </div>
                )}

                {notStartedChallenges.length > 0 && (
                    <div>
                        <h2 className='mb-2 font-semibold'>Défis à démarrer</h2>
                        <CarouselChallenges
                            slides={notStartedChallenges}
                            loop={true}
                            renderItem={renderChallengeCard}
                        />
                    </div>
                )}

                {completedChallenges.length > 0 && (
                    <div>
                        <h2 className='mb-2 font-semibold'>Défis terminés</h2>
                        <CarouselChallenges slides={completedChallenges} loop={true} renderItem={renderCompletedCard} />
                    </div>
                )}
            </main>
        </PageLayout>
    );
}
