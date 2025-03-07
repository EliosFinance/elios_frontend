import { challenges } from '@/temp/DefiData';
import {
    ArrowLeftIcon,
    BookOpenIcon,
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
                className='relative flex flex-col justify-end w-full p-6 text-white bg-center bg-cover h-80'
                style={{ backgroundImage: `url(${defi.backgroundImage})` }}
            >
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='absolute z-10 flex items-center top-4 left-4'>
                    <ArrowLeftIcon className='w-8 h-8 cursor-pointer' onClick={() => navigate(-1)} />
                </div>
                <div className='absolute z-10 flex items-center top-4 right-4'>
                    <InformationCircleIcon className='w-8 h-8 cursor-pointer' />
                </div>
                <div className='relative z-10 flex items-center mt-16 mb-4'>
                    <img
                        src={defi.company.logo}
                        alt={`${defi.company.name}logo`}
                        className='w-16 h-16 p-1 bg-white rounded-full'
                    />
                </div>
                <h1 className='relative z-10 text-4xl font-bold'>{defi.title}</h1>
                <p className='relative z-10 text-2xl'>{defi.rewards.join(', ')}</p>
                <p className='relative z-10 mt-2 text-sm'>Se termine dans 2 jours</p>
            </header>

            <section className='w-full px-6 mt-6'>
                <h2 className='mb-2 text-xl font-bold'>À propos de ce défi</h2>
                <div className='flex items-center mb-2'>
                    <CurrencyDollarIcon className='w-5 h-5 mr-2' />
                    <p>Gagnez {defi.rewards.join(', ')}</p>
                </div>
                <div className='flex items-center mb-2'>
                    <BuildingOfficeIcon className='w-5 h-5 mr-2' />
                    <p>Proposé par {defi.company.name}</p>
                </div>
                <div className='flex items-center'>
                    <BookOpenIcon className='w-5 h-5 mr-2' />
                    <p>Apprenez le fonctionnement d'un éco-système</p>
                </div>
            </section>

            <section className='w-full px-6 mt-6'>
                <h2 className='mb-2 text-xl font-bold'>Le débrief</h2>
                <p className='text-sm'>{defi.description}</p>
            </section>

            <section className='w-full px-6 mt-6'>
                <h2 className='mb-2 text-xl font-bold'>Votre avancement</h2>
                <div ref={chartRef} className='w-full h-64'></div>
            </section>

            <section className='w-full px-6 mt-6'>
                <h2 className='mb-2 text-xl font-bold'>Leaderboard</h2>
                <ul className='mt-2'>
                    {defi.leaderboard.slice(0, visibleEntries).map((entry) => (
                        <li
                            key={entry.rank}
                            className='flex items-center justify-between p-2 mb-2 text-sm bg-gray-100 rounded'
                        >
                            <span>
                                #{entry.rank} {entry.user.username}
                            </span>
                            <span>{entry.score}%</span>
                        </li>
                    ))}
                </ul>
                {visibleEntries < defi.leaderboard.length && (
                    <button onClick={handleShowMore} className='px-4 py-2 mt-4 text-white bg-blue-500 rounded'>
                        Voir plus
                    </button>
                )}
            </section>
        </div>
    );
};

export default SingleDefi;
