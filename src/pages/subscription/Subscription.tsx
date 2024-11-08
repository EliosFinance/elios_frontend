import SlackIcon from '@/components/icons/SlackIcon';
import SpotifyIcon from '@/components/icons/SpotifyIcon';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

type SubscriptionProps = {
    onBack: () => void;
    onToggleVisibility: () => void;
};

const Subscription: React.FC<SubscriptionProps> = ({ onBack, onToggleVisibility }) => {
    const [period, setPeriod] = useState('Monthly');
    const [expenses, setExpenses] = useState([
        { icon: '🎨', name: 'Dribbble Pro', amount: '$160' },
        { icon: <SpotifyIcon className='w-6 h-6' />, name: 'Spotify', amount: '$160' },
        { icon: <SlackIcon className='w-6 h-6' />, name: 'Slack', amount: '$160' },
        { icon: '🎨', name: 'Dribbble Pro', amount: '$160' },
        { icon: <SpotifyIcon className='w-6 h-6' />, name: 'Spotify', amount: '$160' },
        { icon: <SlackIcon className='w-6 h-6' />, name: 'Slack', amount: '$160' },
    ]);

    const chartOptions = {
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

    return (
        <div className='min-h-screen flex flex-col bg-white'>
            <div className='flex justify-between items-center p-4'>
                <button onClick={onBack} className='text-2xl'>
                    ←
                </button>
                <button onClick={onToggleVisibility} className='text-2xl'>
                    👁️
                </button>
            </div>

            <div className='flex-1 flex flex-col items-center px-4 md:px-8 lg:px-16'>
                <div className='w-full max-w-3xl mb-10'>
                    <h2 className='text-lg font-semibold mb-2 md:text-xl lg:text-2xl'>Evolution globale</h2>
                    <p className='text-gray-500 text-sm mb-4 md:text-base'>Nov 1, 2020 - Nov 30, 2020</p>
                    <div className='flex items-center justify-end mb-4'>
                        <span className='text-gray-400 mr-2'>Période :</span>
                        <select
                            className='border border-gray-300 rounded px-2 py-1 text-sm md:text-base'
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                        >
                            <option value='Monthly'>Monthly</option>
                            <option value='Weekly'>Weekly</option>
                        </select>
                    </div>
                    <ReactECharts option={chartOptions} className='w-full h-64 md:h-80 lg:h-96' />
                </div>

                <div className='w-full max-w-3xl'>
                    <h2 className='text-lg font-semibold mt-4 mb-2 md:text-xl lg:text-2xl'>Vos dépenses récurrentes</h2>
                    <p className='text-gray-500 text-sm mb-4 md:text-base'>Novembre 2021</p>
                    <div className='max-h-60 overflow-y-auto space-y-4 md:max-h-80 lg:max-h-96'>
                        {expenses.map((expense, index) => (
                            <div key={index} className='flex items-center justify-between py-2 px-2 md:px-4'>
                                <div className='flex items-center'>
                                    <div className='w-10 h-10 bg-black text-white flex items-center justify-center rounded-full mr-3 md:w-12 md:h-12'>
                                        <span className='text-lg md:text-xl'>{expense.icon}</span>
                                    </div>
                                    <span className='text-sm md:text-base lg:text-lg'>{expense.name}</span>
                                </div>
                                <div className='text-right'>
                                    <p className='font-semibold text-sm md:text-base lg:text-lg'>{expense.amount}</p>
                                    <p className='text-gray-500 text-xs md:text-sm'>Monthly</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
