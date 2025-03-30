import B4 from '@/assets/images/corp/B4.webp';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState('annual');

    const improvements = [
        'Accès à des fonctionnalités exclusives',
        'Support client prioritaire',
        'Mises à jour régulières',
        'Contenu premium',
        'Réductions sur les produits',
    ];

    return (
        <div className='flex flex-col items-center w-full'>
            <section className='w-full px-6 mt-6'>
                {/* Banner with floating image and title */}
                <Card className='relative mb-6 overflow-hidden border-none shadow-none'>
                    <CardHeader className='relative h-60'>
                        <img src={B4} alt='Premium' className='absolute inset-0 object-cover transform scale-110' />
                        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white' />
                        <CardTitle className='absolute text-4xl font-bold text-black transform -translate-x-1/2 bottom-4 left-1/2'>
                            Abonnement
                        </CardTitle>
                    </CardHeader>
                </Card>

                {/* Improvements */}
                <Card className='mb-6 border-none shadow-none'>
                    <CardContent>
                        <CardTitle className='mb-4 text-xl font-semibold'>Qu'est-ce que ça change ?</CardTitle>
                        <ul className='list-disc list-inside space-y-2'>
                            {improvements.map((item, index) => (
                                <li key={index} className='text-sm text-gray-700'>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Plan Selection */}
                <div className='space-y-4'>
                    <Card
                        className={`cursor-pointer ${selectedPlan === 'annual' ? 'border-2 border-blue-500 bg-blue-50' : 'bg-white'}`}
                        onClick={() => setSelectedPlan('annual')}
                    >
                        <CardContent className='flex items-center justify-between'>
                            <div className='flex items-center space-x-2'>
                                <input
                                    type='radio'
                                    name='plan'
                                    readOnly
                                    checked={selectedPlan === 'annual'}
                                    className='accent-blue-500'
                                />
                                <div>
                                    <span className='font-bold'>Annuel</span>
                                    <p className='text-sm text-gray-500'>Economisez 20%</p>
                                </div>
                            </div>
                            <div className='text-right'>
                                <span className='text-lg font-bold'>47,99€</span>
                                <p className='text-sm text-gray-500'>/an</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card
                        className={`cursor-pointer ${selectedPlan === 'monthly' ? 'border-2 border-blue-500 bg-blue-50' : 'bg-white'}`}
                        onClick={() => setSelectedPlan('monthly')}
                    >
                        <CardContent className='flex items-center justify-between'>
                            <div className='flex items-center space-x-2'>
                                <input
                                    type='radio'
                                    name='plan'
                                    readOnly
                                    checked={selectedPlan === 'monthly'}
                                    className='accent-blue-500'
                                />
                                <div>
                                    <span className='font-bold'>Mensuel</span>
                                </div>
                            </div>
                            <div className='text-right'>
                                <span className='text-lg font-bold'>4,99€</span>
                                <p className='text-sm text-gray-500'>/mois</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Button className='w-full py-3 mt-6 text-white bg-blue-500 rounded-full'>Je deviens Premium</Button>
            </section>
        </div>
    );
};

export default Subscription;
