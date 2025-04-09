import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from '@/layout/PageLayout';
import { ArrowLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

import { ChallengeType, challenges } from '@/temp/DefiData';

export default function SingleChallenge() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const chartRef = useRef<HTMLDivElement | null>(null);

    const challenge: ChallengeType | undefined = challenges.find((c) => c.id === Number(id));
    const [visibleEntries, setVisibleEntries] = useState(3);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);
            const option = {
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'] },
                yAxis: { type: 'value' },
                series: [
                    {
                        data: [60, 80, 120, 160, 200],
                        type: 'line',
                        smooth: true,
                        areaStyle: {},
                    },
                ],
            };
            myChart.setOption(option);
        }
    }, []);

    if (!challenge) {
        return (
            <div className='flex flex-col items-center justify-center w-full h-screen bg-gray-50'>
                <h2 className='text-lg font-bold'>Défi introuvable</h2>
                <Button variant='outline' onClick={() => navigate('/challenge')}>
                    Revenir
                </Button>
            </div>
        );
    }

    const handleShowMore = () => setVisibleEntries((prev) => prev + 2);

    return (
        <PageLayout title='Détail du défi' onBack={() => navigate(-1)}>
            <div
                className='relative flex flex-col justify-end w-full h-56 p-4 text-white bg-center bg-cover'
                style={{ backgroundImage: `url(${challenge.backgroundImage})` }}
            >
                <div className='absolute inset-0 bg-black opacity-40' />
                <div className='relative z-10 flex items-center mb-3'>
                    <img
                        src={challenge.company.logo}
                        alt={challenge.company.name}
                        className='w-12 h-12 p-1 mr-2 bg-white rounded-full'
                    />
                    <h2 className='text-lg font-bold'>{challenge.company.name}</h2>
                </div>
                <div className='relative z-10'>
                    <h1 className='text-xl font-bold'>{challenge.title}</h1>
                    <p className='text-sm'>Statut : {challenge.userStatus || 'DEFAULT'}</p>
                </div>
            </div>

            <div className='flex flex-col p-4 space-y-4'>
                <Card>
                    <CardHeader className='p-4'>
                        <CardTitle className='text-sm font-bold'>À propos</CardTitle>
                        <CardDescription className='mt-1 text-xs'>{challenge.description}</CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader className='p-4'>
                        <CardTitle className='text-sm font-bold'>Votre avancement</CardTitle>
                        <CardDescription className='mt-1 text-xs'>
                            Voici votre progression sur quelques jours
                        </CardDescription>
                    </CardHeader>
                    <div className='w-full h-40' ref={chartRef} />
                </Card>

                {challenge.leaderboard && challenge.leaderboard.length > 0 && (
                    <Card>
                        <CardHeader className='p-4'>
                            <CardTitle className='text-sm font-bold'>Leaderboard</CardTitle>
                            <CardDescription className='mt-1 text-xs'>Classement des participants</CardDescription>
                        </CardHeader>
                        <div className='px-4 pb-4'>
                            <ul>
                                {challenge.leaderboard.slice(0, visibleEntries).map((entry) => (
                                    <li
                                        key={entry.rank}
                                        className='flex items-center justify-between py-2 text-sm border-b'
                                    >
                                        <span>
                                            #{entry.rank} {entry.user.username}
                                        </span>
                                        <span className='font-semibold'>{entry.score} pts</span>
                                    </li>
                                ))}
                            </ul>
                            {visibleEntries < challenge.leaderboard.length && (
                                <div className='mt-3 text-center'>
                                    <Button variant='secondary' size='sm' onClick={handleShowMore}>
                                        Voir plus
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>
                )}
            </div>
        </PageLayout>
    );
}
