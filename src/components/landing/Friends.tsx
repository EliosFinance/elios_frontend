import { Card, CardContent } from '@/components/ui/card';
import { CarouselApp, CarouselAppContent, CarouselAppItem } from '@/components/ui/carousel-app';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Friend {
    id: string;
    name: string;
    points: string;
    imageUrl: string;
}

const Friends = () => {
    const navigate = useNavigate();
    const friends: Friend[] = [
        {
            id: '1',
            name: 'Florian PALVADEAU',
            points: '250 EC',
            imageUrl:
                'https://images.unsplash.com/photo-1731756748993-85e1513dfc76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
        },
        {
            id: '2',
            name: 'Florian PALVADEAU',
            points: '250 EC',
            imageUrl:
                'https://images.unsplash.com/photo-1731756748993-85e1513dfc76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG0b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
        },
        {
            id: '3',
            name: 'Florian PALVADEAU',
            points: '250 EC',
            imageUrl:
                'https://images.unsplash.com/photo-1731756748993-85e1513dfc76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
        },
        {
            id: '4',
            name: 'Florian PALVADEAU',
            points: '250 EC',
            imageUrl:
                'https://images.unsplash.com/photo-1731756748993-85e1513dfc76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
        },
    ];

    const handleFriendClick = (friendId: string) => {
        navigate(`/friends/${friendId}`);
    };

    return (
        <CarouselApp
            opts={{
                loop: true,
                dragFree: false,
                align: 'center',
            }}
            className='w-full'
        >
            <CarouselAppContent>
                {friends.map((friend, index) => (
                    <CarouselAppItem key={friend.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            onClick={() => handleFriendClick(friend.id)}
                            className='w-full cursor-pointer transition-transform transform hover:scale-105'
                        >
                            <Card className='overflow-hidden'>
                                <CardContent className='p-0'>
                                    <div className='relative aspect-[16/9] overflow-hidden rounded-t-lg'>
                                        <img
                                            src={friend.imageUrl}
                                            alt={friend.name}
                                            className='object-cover w-full h-full'
                                        />
                                        <div className='absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent'>
                                            <h3 className='font-bold'>{friend.name}</h3>
                                            <p className='text-sm opacity-90'>{friend.points}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </CarouselAppItem>
                ))}
            </CarouselAppContent>
        </CarouselApp>
    );
};

export default Friends;
