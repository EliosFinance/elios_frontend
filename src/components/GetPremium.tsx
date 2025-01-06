import React from 'react';
import premiumLogo from './assets/images/corp/premium_logo.png';

type GetPremiumProps = {
    onTopUpClick: () => void;
};

const GetPremium: React.FC<GetPremiumProps> = ({ onTopUpClick }) => {
    return (
        <div className='flex items-center p-3 border border-gray-300 rounded-lg bg-gray-50'>
            <img src={premiumLogo} alt='Premium icon' className='w-10 h-10 rounded-lg mr-3' />
            <div className='flex flex-col'>
                <button className='bg-orange-500 text-white font-bold text-sm py-1 px-2 rounded mb-1'>
                    Get Premium
                </button>
                <p className='text-gray-500 text-xs mb-2'>Get 50% cashback for the next top up</p>
                <div className='flex items-center cursor-pointer' onClick={onTopUpClick}>
                    <span className='text-sm font-bold text-black'>Top up now</span>
                    <span className='ml-1 text-sm'>→</span>
                </div>
            </div>
        </div>
    );
};

export default GetPremium;
