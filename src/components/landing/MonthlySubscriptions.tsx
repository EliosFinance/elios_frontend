import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Subscription {
  name: string;
  iconUrl: string;
  time: string;
}

const MonthlySubscriptions = () => {
    const navigate = useNavigate();
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([
        { name: 'Figma', iconUrl: 'https://svgl.app/library/figma.svg', time: '12:00 PM' },
        { name: 'Spotify', iconUrl: 'https://svgl.app/library/spotify.svg', time: '12:00 PM' },
        { name: 'Slack', iconUrl: 'https://svgl.app/library/slack.svg', time: '12:00 PM' },
    ]);

    return (
        <section className="w-full">
            {subscriptions.map((subscription, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white shadow rounded-lg mb-4"
                    onClick={() => navigate(`/subscription/${subscription.name.toLowerCase()}`)}
                >
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center p-2">
                            <img 
                                src={subscription.iconUrl} 
                                alt={subscription.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    console.error(`Failed to load icon for ${subscription.name}`);
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        <span className="font-semibold">{subscription.name}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-500 mr-4">{subscription.time}</span>
                        <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default MonthlySubscriptions;