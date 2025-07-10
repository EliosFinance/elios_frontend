import mainLogo from '@/assets/images/corp/main_logo.png';
import { Button } from '@/components/ui/button.tsx';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { BanknotesIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon, ShieldCheckIcon, SparklesIcon, TrendingUpIcon } from 'lucide-react';
import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstTimerView: React.FC = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (localStorage.getItem('firstTimer') === 'false') {
            navigate(APP_ROUTES_ENUM.LOGIN);
        }
    }, []);

    const handleStart = () => {
        localStorage.setItem('firstTimer', 'false');
        navigate(APP_ROUTES_ENUM.LOGIN);
    };

    const features = [
        {
            icon: <BanknotesIcon className='w-6 h-6 text-primary-400' />,
            title: 'Gestion intelligente',
            description: 'Suivez vos finances avec des outils avancés',
        },
        {
            icon: <ChartBarIcon className='w-6 h-6 text-primary-400' />,
            title: 'Analyses détaillées',
            description: 'Comprenez vos habitudes de dépenses',
        },
        {
            icon: <ShieldCheckIcon className='w-6 h-6 text-primary-400' />,
            title: 'Sécurité maximale',
            description: 'Vos données sont protégées en permanence',
        },
    ];

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4'>
            <div className='w-full max-w-md mx-auto'>
                {/* Container principal avec effet glassmorphism */}
                <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl'>
                    {/* Logo et titre */}
                    <div className='text-center mb-8'>
                        <div className='flex items-center justify-center mb-6'>
                            <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg flex items-center justify-center'>
                                <img src={mainLogo} alt='Elios Logo' className='w-12 h-12 object-contain' />
                            </div>
                        </div>

                        <h1 className='text-3xl font-bold text-white mb-2'>ELIOS</h1>

                        <div className='flex items-center justify-center gap-2 mb-4'>
                            <SparklesIcon className='w-5 h-5 text-primary-400' />
                            <p className='text-lg text-gray-300 font-medium'>Bienvenue dans le futur</p>
                        </div>

                        <p className='text-sm text-gray-400 leading-relaxed'>
                            Élevez votre expérience financière avec Elios :
                            <span className='block mt-1 text-primary-300'>L'ère bancaire nouvelle génération</span>
                        </p>
                    </div>

                    {/* Séparateur décoratif */}
                    <div className='flex items-center justify-center mb-8'>
                        <div className='flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
                        <div className='px-4'>
                            <div className='w-3 h-3 bg-primary-500 rounded-full shadow-lg'></div>
                        </div>
                        <div className='flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
                    </div>

                    {/* Fonctionnalités */}
                    <div className='space-y-4 mb-8'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors'
                            >
                                <div className='w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0'>
                                    {feature.icon}
                                </div>
                                <div className='flex-1'>
                                    <h3 className='font-medium text-white text-sm'>{feature.title}</h3>
                                    <p className='text-xs text-gray-400 mt-1'>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bouton principal */}
                    <Button
                        onClick={handleStart}
                        className='w-full h-12 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl'
                    >
                        <TrendingUpIcon className='w-5 h-5' />
                        C'EST PARTI
                        <ArrowRightIcon className='w-5 h-5' />
                    </Button>

                    {/* Message d'encouragement */}
                    <div className='mt-6 text-center'>
                        <p className='text-xs text-gray-500'>
                            Rejoignez des milliers d'utilisateurs qui font confiance à Elios
                        </p>
                    </div>
                </div>

                {/* Indicateurs décoratifs */}
                <div className='flex justify-center mt-6 space-x-2'>
                    <div className='w-2 h-2 bg-primary-500 rounded-full'></div>
                    <div className='w-2 h-2 bg-primary-400/50 rounded-full'></div>
                    <div className='w-2 h-2 bg-primary-300/30 rounded-full'></div>
                </div>
            </div>
        </div>
    );
};

export default FirstTimerView;
