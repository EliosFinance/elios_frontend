import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { EyeIcon, PlusIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingHeader = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-between w-full'>
            <UserIcon className='h-6 w-6' onClick={() => navigate(APP_ROUTES_ENUM.SETTINGS)} />
            <div className='flex items-center space-x-6'>
                <EyeIcon className='h-6 w-6' onClick={() => alert('TODO: Mask important data')} />
                <PlusIcon className='h-6 w-6' onClick={() => navigate(APP_ROUTES_ENUM.CONNECT_BANK_ACCOUNT)} />
            </div>
        </div>
    );
};

export default LandingHeader;
