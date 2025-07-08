import B4 from '@/assets/images/corp/B4.webp';
import CheckoutButton from '@/stripe/checkoutButton';
import { CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';

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
        description: "Jusqu'à 5 membres",
    },
];

const PLAN_PERIODS = [
    {
        key: 'monthly',
        label: 'Mensuel',
        description: 'Maximum de flexibilité',
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
        description: 'Le plus avantageux',
        discount: '-35%',
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
        originalPrice: {
            lite: '29,99€',
            premium: '59,99€',
            famille: '119,99€',
        },
        monthlyEquivalent: {
            lite: '1,67€/mois',
            premium: '4€/mois',
            famille: '7,50€/mois',
        },
    },
];

const Subscription = () => {
    const [selectedType, setSelectedType] = useState<string>('premium');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('annual');

    const liteFeatures = [
        'Analyses IA avancées',
        'Support 24/7',
        'Alertes intelligentes personnalisées',
        "Connection jusqu'à 3 comptes bancaires",
        'Rapports détaillés mensuels',
    ];
    const premiumFeatures = [
        'Analyses IA avancées et prédictives',
        'Support prioritaire 24/7',
        'Alertes intelligentes personnalisées',
        'Connection de comptes illimitée',
        'Rapports détaillés illimités',
        'Accès anticipé aux nouvelles fonctions',
    ];
    const familleFeatures = [
        'Toutes les fonctionnalités Premium',
        "Jusqu'à 5 membres de la famille",
        'Gestion des finances familiales',
        'Partage sécurisé des rapports',
    ];

    const getSelectedPlan = () => {
        return `${selectedType}_${selectedPeriod}`;
    };

    let features: string[] = [];
    if (selectedType === 'lite') {
        features = liteFeatures;
    } else if (selectedType === 'premium') {
        features = premiumFeatures;
    } else if (selectedType === 'famille') {
        features = familleFeatures;
    }

    return (
        <div className='flex flex-col w-full bg-[#181823] h-[85vh] overflow-hidden'>
            {/* Hero section avec image et blur progressif étendu */}
            <div className='relative h-64 mb-5 overflow-hidden'>
                <img src={B4} alt='Premium' className='absolute inset-0 object-cover w-full h-full scale-105' />
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#181823]/30 via-[#181823]/60 to-[#181823]' />
                <div className='absolute inset-x-0 bottom-0 pb-8 text-center'>
                    <h1 className='mb-2 text-3xl font-bold text-white drop-shadow-lg'>Elios Premium</h1>
                    <p className='text-sm text-slate-100 drop-shadow-md'>Libérez votre potentiel financier</p>
                </div>
            </div>

            <div className='flex flex-col flex-1 px-6'>
                {/* Sélection du type de plan */}
                <div className='mb-5'>
                    <h2 className='mb-3 text-lg font-semibold text-white'>Choisissez votre plan</h2>
                    <div className='grid grid-cols-3 gap-2'>
                        {PLAN_TYPES.map((type) => (
                            <Card
                                key={type.key}
                                className={`cursor-pointer transition-all duration-200 relative ${
                                    selectedType === type.key
                                        ? 'ring-2 ring-primary-500 bg-primary-500/10'
                                        : 'border border-slate-600 bg-white/5'
                                }`}
                                onClick={() => setSelectedType(type.key)}
                            >
                                {/* Badge Populaire for Premium */}
                                {type.key === 'premium' && (
                                    <div className='absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10'>
                                        Populaire
                                    </div>
                                )}
                                <CardContent className='p-3 text-center'>
                                    <span className='block text-sm font-semibold text-white'>{type.label}</span>
                                    <span className='text-xs text-slate-400'>{type.description}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Avantages */}
                <div className='mb-5 min-h-[175px]'>
                    <div className='grid grid-cols-2 gap-2'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='flex items-center gap-2 p-2.5 bg-gradient-to-br from-white/8 to-white/4 rounded-lg border border-white/10 backdrop-blur-sm'
                            >
                                <CheckCircleIcon className='flex-shrink-0 w-4 h-4 text-emerald-400' />
                                <span className='text-xs font-medium leading-tight text-white'>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Plans de tarification */}
                <div className='mb-5 space-y-3'>
                    {PLAN_PERIODS.map((period) => (
                        <Card
                            key={period.key}
                            className={`cursor-pointer transition-all duration-200 ${
                                selectedPeriod === period.key
                                    ? 'ring-2 ring-primary-500 bg-primary-500/10'
                                    : 'border border-slate-600 bg-white/5'
                            }`}
                            onClick={() => setSelectedPeriod(period.key)}
                        >
                            <CardContent className='p-4'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center space-x-3'>
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                selectedPeriod === period.key
                                                    ? 'border-primary-500 bg-primary-500'
                                                    : 'border-slate-400'
                                            }`}
                                        >
                                            {selectedPeriod === period.key && (
                                                <div className='w-2 h-2 bg-white rounded-full' />
                                            )}
                                        </div>
                                        <div>
                                            <div className='flex items-center gap-2'>
                                                <span className='font-semibold text-white'>{period.label}</span>
                                                {period.discount && (
                                                    <span className='px-2 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r from-amber-500 to-orange-500'>
                                                        {period.discount}
                                                    </span>
                                                )}
                                            </div>
                                            <p className='text-xs text-slate-400'>{period.description}</p>
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <div className='flex items-baseline gap-1'>
                                            <span className='text-xl font-bold text-white'>
                                                {period.priceDisplay[selectedType]}
                                            </span>
                                            {period.originalPrice && (
                                                <span className='text-sm line-through text-slate-500'>
                                                    {period.originalPrice[selectedType]}
                                                </span>
                                            )}
                                        </div>
                                        <p className='text-xs text-slate-400'>
                                            {period.monthlyEquivalent
                                                ? period.monthlyEquivalent[selectedType]
                                                : `/${period.key === 'annual' ? 'an' : 'mois'}`}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Garantie */}
                <div className='mb-6 text-center'>
                    <div className='flex items-center justify-center gap-2 mb-1 text-emerald-400'>
                        <ShieldCheckIcon className='w-4 h-4' />
                        <span className='text-xs font-medium'>Garantie 30 jours</span>
                    </div>
                    <p className='text-xs text-slate-500'>Résiliable à tout moment</p>
                </div>

                {/* CTA */}
                <div className='pb-6 mt-auto'>
                    <CheckoutButton plan={getSelectedPlan()} />
                </div>
            </div>
        </div>
    );
};

export default Subscription;
