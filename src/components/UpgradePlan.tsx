import B4 from '@/assets/images/corp/B4.webp';
import CheckoutButton from '@/stripe/checkoutButton';
import { CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

    const features = [
        'Analyses IA avancées',
        'Support prioritaire', 
        'Fonctionnalités exclusives',
        'Conseils personnalisés'
    ];

    return (
        <div className='flex flex-col w-full bg-[#181823] h-[85vh] overflow-hidden'>
            {/* Hero section avec image et blur progressif */}
            <div className='relative h-48 mb-6 overflow-hidden'>
                <img src={B4} alt='Premium' className='absolute inset-0 w-full h-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#181823]/20 to-[#181823]' />
                <div className='absolute inset-x-0 bottom-0 text-center pb-6'>
                    <h1 className='text-3xl font-bold text-white mb-2'>Elios Premium</h1>
                    <p className='text-sm text-slate-200'>Libérez votre potentiel financier</p>
                </div>
            </div>

            <div className='flex-1 px-6 flex flex-col'>
                {/* Avantages */}
                <div className='mb-6'>
                    <div className='grid grid-cols-2 gap-2'>
                        {features.map((feature, index) => (
                            <div key={index} className='flex items-center gap-2 p-2.5 bg-white/5 rounded-lg border border-white/10'>
                                <CheckCircleIcon className='w-4 h-4 text-emerald-400 flex-shrink-0' />
                                <span className='text-xs text-white font-medium leading-tight'>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Plans de tarification */}
                <div className='mb-5 space-y-3'>
                    {/* Plan Annuel */}
                    <Card
                        className={`cursor-pointer transition-all duration-200 ${
                            selectedPlan === 'annual' 
                                ? 'ring-2 ring-primary-500 bg-primary-500/10' 
                                : 'border border-slate-600 bg-white/5'
                        }`}
                        onClick={() => setSelectedPlan('annual')}
                    >
                        <CardContent className='p-4'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-3'>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        selectedPlan === 'annual' ? 'border-primary-500 bg-primary-500' : 'border-slate-400'
                                    }`}>
                                        {selectedPlan === 'annual' && <div className='w-2 h-2 bg-white rounded-full' />}
                                    </div>
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <span className='font-semibold text-white'>Annuel</span>
                                            <span className='text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full font-medium'>-35%</span>
                                        </div>
                                        <p className='text-xs text-slate-400'>Le plus avantageux</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <div className='flex items-baseline gap-1'>
                                        <span className='text-xl font-bold text-white'>47,99€</span>
                                        <span className='text-sm text-slate-500 line-through'>59,99€</span>
                                    </div>
                                    <p className='text-xs text-slate-400'>4€/mois</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Plan Mensuel */}
                    <Card
                        className={`cursor-pointer transition-all duration-200 ${
                            selectedPlan === 'monthly' 
                                ? 'ring-2 ring-primary-500 bg-primary-500/10' 
                                : 'border border-slate-600 bg-white/5'
                        }`}
                        onClick={() => setSelectedPlan('monthly')}
                    >
                        <CardContent className='p-4'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-3'>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        selectedPlan === 'monthly' ? 'border-primary-500 bg-primary-500' : 'border-slate-400'
                                    }`}>
                                        {selectedPlan === 'monthly' && <div className='w-2 h-2 bg-white rounded-full' />}
                                    </div>
                                    <div>
                                        <span className='font-semibold text-white'>Mensuel</span>
                                        <p className='text-xs text-slate-400'>Maximum de flexibilité</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <span className='text-xl font-bold text-white'>4,99€</span>
                                    <p className='text-xs text-slate-400'>/mois</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Garantie */}
                <div className='text-center mb-6'>
                    <div className='flex items-center justify-center gap-2 text-emerald-400 mb-1'>
                        <ShieldCheckIcon className='w-4 h-4' />
                        <span className='text-xs font-medium'>Garantie 30 jours</span>
                    </div>
                    <p className='text-xs text-slate-500'>Résiliable à tout moment</p>
                </div>

                {/* CTA */}
                <div className='mt-auto pb-6'>
                    <CheckoutButton plan={selectedPlan as 'annual' | 'monthly'} />
                </div>
            </div>
        </div>
    );
};

export default Subscription;
