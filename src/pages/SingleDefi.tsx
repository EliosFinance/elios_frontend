import {
    ArrowLeftIcon,
    BookOpenIcon,
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { challenges } from '../temp/DefiData';

const SingleDefi = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const defi = challenges.find((challenge) => challenge.id === parseInt(id));
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [visibleEntries, setVisibleEntries] = useState(5);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            const option = {
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true,
                    },
                ],
            };

            myChart.setOption(option);
        }
    }, []);

    if (!defi) {
        return <div>Défi non trouvé</div>;
    }

    const handleShowMore = () => {
        setVisibleEntries((prev) => prev + 10);
    };

    return (
        <div className='flex flex-col items-center'>
            <header
                className='w-full h-80 bg-cover bg-center relative flex flex-col justify-end p-6 text-white'
                style={{ backgroundImage: `url(${defi.backgroundImage})` }}
            >
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='absolute top-4 left-4 flex items-center z-10'>
                    <ArrowLeftIcon className='w-8 h-8 cursor-pointer' onClick={() => navigate(-1)} />
                </div>
                <div className='absolute top-4 right-4 flex items-center z-10'>
                    <InformationCircleIcon className='w-8 h-8 cursor-pointer' />
                </div>
                <div className='relative flex items-center mb-4 z-10 mt-16'>
                    <img
                        src={defi.companyLogo}
                        alt={`${defi.sponsor} logo`}
                        className='w-16 h-16 rounded-full bg-white p-1'
                    />
                </div>
                <h1 className='relative text-4xl font-bold z-10'>{defi.title}</h1>
                <p className='relative text-2xl z-10'>{defi.reward}</p>
                <p className='relative text-sm mt-2 z-10'>Se termine dans 2 jours</p>
            </header>

            <section className='w-full mt-6 px-6'>
                <h2 className='text-xl font-bold mb-2'>À propos de ce défi</h2>
                <div className='flex items-center mb-2'>
                    <CurrencyDollarIcon className='w-5 h-5 mr-2' />
                    <p>Gagnez {defi.reward}</p>
                </div>
                <div className='flex items-center mb-2'>
                    <BuildingOfficeIcon className='w-5 h-5 mr-2' />
                    <p>Proposé par {defi.sponsor}</p>
                </div>
                <div className='flex items-center'>
                    <BookOpenIcon className='w-5 h-5 mr-2' />
                    <p>Apprenez le fonctionnement d'un éco-système</p>
                </div>
            </section>

            <section className='w-full mt-6 px-6'>
                <h2 className='text-xl font-bold mb-2'>Le débrief</h2>
                <p className='text-sm'>{defi.description}</p>
            </section>

            <section className='w-full mt-6 px-6'>
                <h2 className='text-xl font-bold mb-2'>Votre avancement</h2>
                <div ref={chartRef} className='w-full h-64'></div>
            </section>

            <section className='w-full mt-6 px-6'>
                <h2 className='text-xl font-bold mb-2'>Leaderboard</h2>
                <ul className='mt-2'>
                    {defi.leaderboard.slice(0, visibleEntries).map((entry) => (
                        <li
                            key={entry.rank}
                            className='text-sm flex justify-between items-center bg-gray-100 p-2 rounded mb-2'
                        >
                            <span>
                                #{entry.rank} {entry.name}
                            </span>
                            <span>{entry.score}%</span>
                        </li>
                    ))}
                </ul>
                {visibleEntries < defi.leaderboard.length && (
                    <button onClick={handleShowMore} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
                        Voir plus
                    </button>
                )}
            </section>
        </div>
    );
};

export default SingleDefi;
