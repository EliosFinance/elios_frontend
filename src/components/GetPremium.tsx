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
            className='w-full p-3 bg-transparent border border-gray-300 cursor-pointer rounded-xl'
        >
            <div className='flex items-center'>
                <div className='relative mr-3'>
                    <CardHeader className='p-0'>
                        <img src={premiumLogo} alt='Premium icon' className='w-12 h-12 rounded-2xl' />
                        <span className='h-5 w-5 absolute top-[-6px] left-10 bg-orange-500 border-2 border-white rounded-full' />
                    </CardHeader>
                </div>
                <div className='flex flex-col'>
                    <CardTitle className='py-1 text-xl font-black'>Devenez Premium</CardTitle>
                    <CardDescription className='text-sm text-gray-500'>
                        Profitez de 35% de réduction dès maintenant !
                    </CardDescription>
                    <div className='flex items-center cursor-pointer'>
                        <p className='text-sm font-bold text-gray-500'>C'est parti !</p>
                        <ChevronRightIcon className='w-4 h-4 ml-1' />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default GetPremium;
