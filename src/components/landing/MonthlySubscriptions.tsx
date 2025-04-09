import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle } from '../ui/card';

interface Subscription {
    name: string;
    iconUrl: string;
    time: string;
}

const MonthlySubscriptions = () => {
    const navigate = useNavigate();
    const [subscriptions, _setSubscriptions] = useState<Subscription[]>([
        { name: 'Figma', iconUrl: 'https://svgl.app/library/figma.svg', time: '12:00 PM' },
        { name: 'Spotify', iconUrl: 'https://svgl.app/library/spotify.svg', time: '12:00 PM' },
        { name: 'Slack', iconUrl: 'https://svgl.app/library/slack.svg', time: '12:00 PM' },
    ]);

    return (
        <section className='w-full'>
            {subscriptions.map((subscription, index) => (
                <Card
                    key={index}
                    className='mb-4 cursor-pointer transition-shadow duration-300 hover:shadow-xl'
                    onClick={() => navigate(`/subscription/${subscription.name.toLowerCase()}`)}
                >
                    <CardContent className='flex items-center justify-between p-4'>
                        <div className='flex items-center'>
                            <div className='flex items-center justify-center w-10 h-10 p-2 mr-4 rounded-full'>
                                <img
                                    src={subscription.iconUrl}
                                    alt={subscription.name}
                                    className='object-contain w-full h-full'
                                    onError={(e) => {
                                        console.error(`Failed to load icon for ${subscription.name}`);
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                            <CardTitle>{subscription.name}</CardTitle>
                        </div>
                        <div className='flex items-center'>
                            <span className='mr-4 text-gray-500'>{subscription.time}</span>
                            <ChevronRightIcon className='w-5 h-5 text-gray-500' />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </section>
    );
};

export default MonthlySubscriptions;
