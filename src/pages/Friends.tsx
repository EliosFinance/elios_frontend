import PageLayout from '@/layout/PageLayout';
import { friendsData } from '@/temp/FriendsData';
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon, EyeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFriend, setExpandedFriend] = useState<string | null>(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const filteredFriends = friendsData.filter((friend) =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const toggleExpand = (name: string) => {
        setExpandedFriend(expandedFriend === name ? null : name);
    };

    // const toggleModal = () => {
    //     setIsModalOpen(!isModalOpen);
    // };

    return (
        <PageLayout title='Suivez les statistiques de vos amis' onBack={() => navigate(-1)}>
            <div className='absolute z-10 flex items-center top-4 right-4'>
                <EyeIcon className='w-8 h-8 cursor-pointer' />
            </div>

            <section className='w-full px-6 mt-6'>
                <input
                    type='text'
                    placeholder='Recherchez vos amis'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full p-2 mb-4 border rounded'
                />

                {filteredFriends.map((friend) => (
                    <div key={friend.name} className='mb-4'>
                        <div
                            className='flex items-center justify-between p-4 bg-white rounded shadow cursor-pointer'
                            onClick={() => toggleExpand(friend.name)}
                        >
                            <div className='flex items-center'>
                                <div className='p-4 text-black bg-gray-300 rounded'>
                                    <p>Score</p>
                                    <p className='text-2xl font-bold'>{friend.score}</p>
                                </div>
                                <div className='ml-4'>
                                    <p>{friend.name}</p>
                                </div>
                            </div>
                            {expandedFriend === friend.name ? (
                                <ChevronUpIcon className='w-6 h-6' />
                            ) : (
                                <ChevronDownIcon className='w-6 h-6' />
                            )}
                        </div>

                        {expandedFriend === friend.name && (
                            <motion.div
                                className='p-4 mt-2 bg-gray-100 rounded'
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className='flex mb-4 space-x-2'>
                                    {friend.products.map((product, index) => (
                                        <div key={index} className='p-2 text-black bg-gray-300 rounded'>
                                            <p>Produit</p>
                                            <p>{product}%</p>
                                        </div>
                                    ))}
                                </div>
                                <h3 className='mb-2 font-bold'>Travail en retard</h3>
                                <div className='flex items-center mb-2'>
                                    <div className='p-2 text-black bg-red-300 rounded-full'>
                                        <p>{friend.overdueWork.percentage}%</p>
                                    </div>
                                    <div className='ml-2'>
                                        <p>{friend.overdueWork.count} Travaux en retard</p>
                                        <p>{friend.overdueWork.description}</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='p-2 text-black bg-yellow-300 rounded-full'>
                                        <p>{friend.finishedLate.percentage}%</p>
                                    </div>
                                    <div className='ml-2'>
                                        <p>{friend.finishedLate.count} Travaux finis en retard</p>
                                        <p>{friend.finishedLate.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/friends/${friend.id}`)}
                                    className='px-4 py-2 mt-4 text-white bg-blue-500 rounded'
                                >
                                    Plus d'infos
                                </button>
                            </motion.div>
                        )}
                    </div>
                ))}
            </section>
        </PageLayout>
    );
};

export default Friends;
