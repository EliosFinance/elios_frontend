import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ArrowLeftIcon, EyeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Rewards = () => {
    const navigate = useNavigate();

    const copyToClipboard = () => {
        navigator.clipboard.writeText('elios.me/username-id');
        alert('Link copied to clipboard!');
    };

    return (
        <div className='flex flex-col items-center w-full px-6'>
            <header className='w-full h-20 bg-gray-200 flex items-center justify-between px-6 relative'>
                <div className='absolute top-4 left-4 flex items-center z-10'>
                    <ArrowLeftIcon className='w-8 h-8 cursor-pointer' onClick={() => navigate(-1)} />
                </div>
                <h2 className='text-xl font-bold z-10'>Récompenses</h2>
                <div className='absolute top-4 right-4 flex items-center z-10'>
                    <EyeIcon className='w-8 h-8 cursor-pointer' />
                </div>
            </header>

            <section className='w-full mt-6'>
                <h3 className='text-lg font-bold mb-4'>Parrainez vos amis & gagnez 100 points</h3>
                <div className='bg-gray-100 p-4 rounded mb-4 flex items-center justify-between'>
                    <input
                        type='text'
                        value='elios.me/username-id'
                        className='bg-white p-2 rounded w-full mr-2'
                        readOnly
                    />
                    <button onClick={copyToClipboard} className='bg-gray-300 text-sm px-2 py-1 rounded'>
                        Copy
                    </button>
                </div>
                <button className='w-full bg-blue-500 text-white py-2 rounded mb-4'>Partager</button>

                <div className='bg-gray-100 p-4 rounded mb-4'>
                    <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center'>
                            <img
                                src='https://images.unsplash.com/photo-1574607407517-cd664b1504f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29pbnN8ZW58MHx8MHx8fDA%3D'
                                alt='EliCoins'
                                className='w-16 h-16 mr-2'
                            />
                            <span className='font-bold'>Mes EliCoins</span>
                        </div>
                        <span className='font-bold'>125/500</span>
                    </div>
                    <div className='bg-blue-200 h-2 rounded-full'>
                        <div className='bg-blue-500 h-2 rounded-full' style={{ width: '25%' }}></div>
                    </div>
                </div>

                <div className='flex justify-between mb-4'>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded flex-1 mr-2'>Activité</button>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <button className='bg-blue-500 text-white py-2 px-4 rounded flex-1'>
                                Comment ça marche
                            </button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Comment ça marche</DrawerTitle>
                                <DrawerClose className='absolute top-4 right-4'>
                                    <button className='text-gray-500'>Close</button>
                                </DrawerClose>
                            </DrawerHeader>
                            <div className='p-4'>
                                <p>Explaining text goes here...</p>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>

                <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-bold'>
                        Récompenses <InformationCircleIcon className='w-4 h-4 inline' />
                    </h3>
                    <span className='text-blue-500 cursor-pointer'>Voir tout</span>
                </div>

                {[...Array(4)].map((_, index) => (
                    <div key={index} className='bg-gray-100 p-4 rounded mb-4 flex items-center justify-between'>
                        <img
                            src='https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            alt='Reward'
                            className='w-10 h-10 mr-4'
                        />
                        <div className='flex-1'>
                            <p>5% sur votre prochaine commande</p>
                            <div className='bg-blue-200 h-2 rounded-full mt-2'>
                                <div className='bg-blue-500 h-2 rounded-full' style={{ width: '50%' }}></div>
                            </div>
                        </div>
                        <button className='bg-blue-500 text-white py-1 px-3 rounded ml-4'>Récupérer</button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Rewards;
