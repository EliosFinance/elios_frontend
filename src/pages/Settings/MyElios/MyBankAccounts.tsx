import AppDrawer from '@/components/AppDrawer';
import GetPremium from '@/components/GetPremium';
import Subscription from '@/components/UpgradePlan';
import { ArrowPathRoundedSquareIcon, TvIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SettingsPageHeader from '../SettingsPageHeader';

const MyBankAccounts = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const BankAccount = (_bankAccount: any) => {
        return (
            <div className='w-full flex flex-col gap-4 items-start justify-center rounded-4 border-solid border-2 border-gray-200 p-4'>
                <div className='w-full flex items-center justify-between'>
                    <div className='w-full flex items-center justify-start gap-2'>
                        <TvIcon className='w-6 h-6 object-cover object-center' />
                        <span>Bank Name</span>
                    </div>
                    <p>16446€</p>
                </div>

                <div className='w-full flex items-center justify-start border-solid border-2 bg-blue-500 p-2 rounded-2 gap-2 text-white'>
                    <ArrowPathRoundedSquareIcon className='w-6 h-6 object-cover object-center' />
                    <p>Re synchroniser</p>
                </div>
            </div>
        );
    };

    return (
        <div className='w-full h-full flex flex-col gap-8 items-start justify-center px-4 py-8 mb-12'>
            <SettingsPageHeader />

            <div className='w-full flex flex-col gap-4 items-start justify-center'>
                {[1, 2, 3].map((bankAccount, index) => (
                    <BankAccount key={index} bankAccount={bankAccount} />
                ))}
            </div>

            <GetPremium onTopUpClick={() => setIsDrawerOpen(true)} />
            <AppDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} title='Devenez Premium'>
                <Subscription />
            </AppDrawer>
        </div>
    );
};

export default MyBankAccounts;
