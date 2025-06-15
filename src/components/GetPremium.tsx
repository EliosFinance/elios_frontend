import { ChevronRightIcon } from 'lucide-react';
import React from 'react';
import premiumLogo from '../assets/images/corp/premium_logo.png';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type GetPremiumProps = {
    onTopUpClick: () => void;
};

const GetPremium: React.FC<GetPremiumProps> = ({ onTopUpClick }) => {
    return (
        <Card
            onClick={onTopUpClick}
            className='relative w-full p-4 transition-all duration-200 border cursor-pointer bg-white/5 border-primary-500/30 rounded-xl hover:bg-white/10 hover:border-primary-500/50 backdrop-blur-sm'
        >
            {/* Badge discret */}
            <div className='absolute px-2 py-1 text-xs font-medium text-white bg-orange-500 rounded-md top-3 right-3'>
                -35%
            </div>
            
            <div className='flex items-center'>
                <div className='relative mr-4'>
                    <CardHeader className='p-0'>
                        <img src={premiumLogo} alt='Premium icon' className='w-12 h-12 rounded-xl' />
                        <span className='absolute w-3 h-3 bg-orange-500 border-2 border-white rounded-full -top-1 -right-1' />
                    </CardHeader>
                </div>
                <div className='flex flex-col flex-1'>
                    <CardTitle className='mb-1 text-lg font-bold text-white'>Devenez Premium</CardTitle>
                    <CardDescription className='mb-2 text-sm text-gray-400'>
                        Accès complet aux analyses avancées
                    </CardDescription>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <span className='text-lg font-bold text-white'>4,99€</span>
                            <span className='text-sm text-gray-500 line-through'>7,99€</span>
                        </div>
                        <div className='flex items-center text-sm font-medium text-primary-500'>
                            <span>Découvrir</span>
                            <ChevronRightIcon className='w-4 h-4 ml-1' />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default GetPremium;
