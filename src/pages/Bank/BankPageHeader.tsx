import AppDrawer from '@/components/AppDrawer';
import { ArrowUturnLeftIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BankPageHeader = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-between w-full h-12'>
            <ArrowUturnLeftIcon className='object-cover object-center w-6 h-6' onClick={() => navigate(-1)} />
            <QuestionMarkCircleIcon className='w-6 h-6' onClick={() => setIsDrawerOpen(true)} />

            <AppDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} title="Besoin d'aide ?">
                <div className='flex flex-col gap-4'>
                    <span className='text-lg'>Contactez notre service client</span>
                    <span className='text-lg'>+33 1 23 45 67 89</span>
                </div>
            </AppDrawer>
        </div>
    );
};

export default BankPageHeader;
