import B4 from '@/assets/images/corp/B4.webp';
import CheckoutButton from '@/stripe/checkoutButton';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const PLAN_TYPES = [
    {
        key: 'lite',
        label: 'Lite',
        description: 'Accès limité',
    },
    {
        key: 'premium',
        label: 'Premium',
        description: 'Toutes fonctionnalités',
    },
    {
        key: 'famille',
        label: 'Famille',
        description: "Jusqu'a 5 membres",
    },
];

const PLAN_PERIODS = [
    {
        key: 'monthly',
        label: 'Mensuel',
        price: {
            lite: 199,
            premium: 499,
            famille: 899,
        },
        priceDisplay: {
            lite: '1,99€',
            premium: '4,99€',
            famille: '8,99€',
        },
    },
    {
        key: 'annual',
        label: 'Annuel',
        price: {
            lite: 1999,
            premium: 4799,
            famille: 8999,
        },
        priceDisplay: {
            lite: '19,99€',
            premium: '47,99€',
            famille: '89,99€',
        },
    },
];

const Subscription = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

    const improvements = [
        'Accès à des fonctionnalités exclusives',
        'Support client prioritaire',
        'Mises à jour régulières',
        'Contenu premium',
        'Réductions sur les produits',
    ];

    return (
        <div className='flex flex-col items-center w-full bg-[#181823] mb-6'>
            <section className='w-full px-6 mt-6'>
                {/* Banner with floating image and title */}
                <Card className='relative mb-6 overflow-hidden border-none shadow-none'>
                    <CardHeader className='relative h-60'>
                        <img src={B4} alt='Premium' className='absolute inset-0 object-cover transform scale-110' />
                        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#171723]' />
                        <CardTitle className='absolute text-4xl font-bold text-white transform -translate-x-1/2 bottom-4 left-1/2'>
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
                                <li key={index} className='text-sm text-gray-200'>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Type Selection */}
                <div className='space-y-4 mb-6'>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        {PLAN_TYPES.map((type) => (
                            <Card
                                key={type.key}
                                className={`flex-1 cursor-pointer transition-all duration-200 relative ${selectedType === type.key ? 'border-2 border-primary-500 bg-[#171723] scale-105' : 'bg-[#181823]'}`}
                                onClick={() => {
                                    setSelectedType(type.key);
                                    setSelectedPeriod(null);
                                }}
                            >
                                {/* Badge Populaire for Premium */}
                                {type.key === 'premium' && (
                                    <div
                                        className='absolute top-4 right-4 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg tracking-wide z-10'
                                        style={{ letterSpacing: '0.05em' }}
                                    >
                                        Populaire
                                    </div>
                                )}
                                <CardContent className='flex flex-col items-center justify-center py-6'>
                                    <span className='text-2xl font-bold mb-2'>{type.label}</span>
                                    <span className='text-gray-300 text-center'>{type.description}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Period Selection */}
                {selectedType && (
                    <div className='space-y-4 mb-6'>
                        <div className='flex flex-col sm:flex-row gap-4'>
                            {PLAN_PERIODS.map((period) => (
                                <Card
                                    key={period.key}
                                    className={`flex-1 cursor-pointer transition-all duration-200 ${selectedPeriod === period.key ? 'border-2 border-primary-500 bg-[#171723] scale-105' : 'bg-[#181823]'}`}
                                    onClick={() => setSelectedPeriod(period.key)}
                                >
                                    <CardContent className='flex flex-col items-center justify-center py-6'>
                                        <span className='text-xl font-bold mb-2'>{period.label}</span>
                                        <span className='text-2xl font-bold mb-2'>
                                            {period.priceDisplay[selectedType]}
                                        </span>
                                        <span className='text-gray-300'>
                                            / {period.key === 'annual' ? 'an' : 'mois'}
                                        </span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Checkout Button */}
                {selectedType && selectedPeriod && <CheckoutButton plan={`${selectedType}_${selectedPeriod}`} />}
            </section>
        </div>
    );
};

export default Subscription;
