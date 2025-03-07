import { Card } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';
import BackIcon from '../../assets/images/icons/arrow_back.png';
import DribblePro from '../../assets/images/icons/dribblepro_icon.png';
import Eye from '../../assets/images/icons/eye_icon.png';
import EyeOff from '../../assets/images/icons/eye_off_icon.png';
import SlackIcon from '../../assets/images/icons/slack_icon.png';
import SpotifyIcon from '../../assets/images/icons/spotify_icon.png';

const Subscription = ({ onBack }) => {
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
        <div className='flex flex-col w-full min-h-screen p-4 bg-gray-100'>
            <div className='flex items-center justify-between w-full mb-4'>
                <img src={BackIcon} alt='back' className='w-5 h-5 cursor-pointer' onClick={onBack} />
                <img
                    src={isVisible ? Eye : EyeOff}
                    alt='eye'
                    className='object-contain w-6 h-6 cursor-pointer'
                    onClick={toggleVisibility}
                />
            </div>

            <div className='w-full px-8'>
                <Card className='w-full p-6 mb-6 shadow-lg'>
                    <h2 className='text-2xl font-semibold'>Evolution globale</h2>
                    <p className='text-sm text-gray-500'>Nov 1, 2020 - Nov 30, 2020</p>
                    <p className='text-lg text-gray-700'>
                        {period === 'Monthly' ? 'Nombre de dépenses ce mois : ' : 'Nombre de dépenses cette semaine : '}
                        <span className={`${!isVisible ? 'blur-sm' : ''}`}>{period === 'Monthly' ? '45' : '12'}</span>
                    </p>
                    <div className='flex items-center justify-end my-4'>
                        <span className='mr-2 text-gray-400'>Période :</span>
                        <select
                            className='px-3 py-2 border rounded'
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                        >
                            <option value='Monthly'>Monthly</option>
                            <option value='Weekly'>Weekly</option>
                        </select>
                    </div>
                    <div className={`${!isVisible ? 'blur-sm' : ''}`}>
                        {isVisible && <ReactECharts option={chartOptions} className='w-full h-72' />}
                    </div>
                </Card>

                <h2 className='mb-2 text-2xl font-semibold'>Vos dépenses récurrentes</h2>
                <p className='mb-4 text-sm text-gray-500'>Novembre 2021</p>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto max-h-[400px] md:max-h-none'>
                    {expensesData[period].map((expense, index) => (
                        <Card key={index} className='flex items-center justify-between w-full p-4 shadow-md'>
                            <div className='flex items-center'>
                                <div className='flex items-center justify-center w-10 h-10 mr-3 text-white bg-gray-800 rounded-full'>
                                    {expense.icon}
                                </div>
                                <span className='text-sm'>{expense.name}</span>
                            </div>
                            <div className='text-right'>
                                <p className={`font-semibold text-sm ${!isVisible ? 'blur-sm' : ''}`}>
                                    {expense.amount}
                                </p>
                                <p className='text-xs text-gray-500'>Monthly</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subscription;
