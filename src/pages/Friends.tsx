import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EyeIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { friendsData } from '../temp/FriendsData';
import { motion, AnimatePresence } from 'framer-motion';

const Friends = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFriend, setExpandedFriend] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const filteredFriends = friendsData.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleExpand = (name: string) => {
        setExpandedFriend(expandedFriend === name ? null : name);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <header className="w-full h-20 bg-gray-200 flex items-center justify-between px-6 relative">
                <div className="absolute top-4 left-4 flex items-center z-10">
                    <ArrowLeftIcon className="w-8 h-8 cursor-pointer" onClick={() => navigate(-1)} />
                </div>
                <h2 className="text-xl font-bold z-10">Suivez les statistiques de vos amis</h2>
                <div className="absolute top-4 right-4 flex items-center z-10">
                    <EyeIcon className="w-8 h-8 cursor-pointer" />
                </div>
            </header>

            <section className="w-full mt-6 px-6">
                <input
                    type="text"
                    placeholder="Recherchez vos amis"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />

                {filteredFriends.map(friend => (
                    <div key={friend.name} className="mb-4">
                        <div
                            className="flex items-center justify-between p-4 bg-white shadow rounded cursor-pointer"
                            onClick={() => toggleExpand(friend.name)}
                        >
                            <div className="flex items-center">
                                <div className="bg-gray-300 text-black p-4 rounded">
                                    <p>Score</p>
                                    <p className="text-2xl font-bold">{friend.score}</p>
                                </div>
                                <div className="ml-4">
                                    <p>{friend.name}</p>
                                </div>
                            </div>
                            {expandedFriend === friend.name ? (
                                <ChevronUpIcon className="w-6 h-6" />
                            ) : (
                                <ChevronDownIcon className="w-6 h-6" />
                            )}
                        </div>

                        {expandedFriend === friend.name && (
                            <motion.div
                                className="bg-gray-100 p-4 rounded mt-2"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex space-x-2 mb-4">
                                    {friend.products.map((product, index) => (
                                        <div key={index} className="bg-gray-300 text-black p-2 rounded">
                                            <p>Produit</p>
                                            <p>{product}%</p>
                                        </div>
                                    ))}
                                </div>
                                <h3 className="font-bold mb-2">Travail en retard</h3>
                                <div className="flex items-center mb-2">
                                    <div className="bg-red-300 text-black p-2 rounded-full">
                                        <p>{friend.overdueWork.percentage}%</p>
                                    </div>
                                    <div className="ml-2">
                                        <p>{friend.overdueWork.count} Travaux en retard</p>
                                        <p>{friend.overdueWork.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-yellow-300 text-black p-2 rounded-full">
                                        <p>{friend.finishedLate.percentage}%</p>
                                    </div>
                                    <div className="ml-2">
                                        <p>{friend.finishedLate.count} Travaux finis en retard</p>
                                        <p>{friend.finishedLate.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/friends/${friend.id}`)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Plus d'infos
                                </button>
                            </motion.div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Friends;