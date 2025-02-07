import { ChevronRightIcon } from 'lucide-react';
import React from 'react';
import premiumLogo from '../assets/images/corp/premium_logo.png';

type GetPremiumProps = {
    onTopUpClick: () => void;
};

const GetPremium: React.FC<GetPremiumProps> = ({ onTopUpClick }) => {
    return (
        <div className='w-full flex items-center p-3 border border-gray-300 rounded-xl bg-transparent'>
            <div className='relative'>
                <img src={premiumLogo} alt='Premium icon' className='w-12 h-12 rounded-2xl mr-3' />
                <span className='h-5 w-5 absolute top-[-6px] left-10 bg-orange-500 border-solid border-[3px] border-white rounded-full' />
            </div>
            <div className='flex flex-col w-auto items-start'>
                <p className='font-black text-xl py-1 rounded'>Get Premium</p>
                <p className='text-gray-500 text-sm'>Get 50% cashback for the next top up</p>
                <div className='flex items-center cursor-pointer' onClick={onTopUpClick}>
                    <span className='text-sm font-bold text-gray-500'>Top up now</span>
                    <ChevronRightIcon className='w-4 h-4 ml-1' />
                </div>
            </div>
        </div>
    );
};

export default GetPremium;
