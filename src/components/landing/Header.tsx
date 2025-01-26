import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { EyeIcon, PlusIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Subscription from '../UpgradePlan';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';

const LandingHeader = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-between w-full'>
            <UserIcon className='h-6 w-6' onClick={() => navigate(APP_ROUTES_ENUM.SETTINGS)} />
            <div className='flex items-center space-x-4'>
                <EyeIcon className='h-6 w-6' onClick={() => alert('TODO: Mask important data')} />
                <PlusIcon className='h-6 w-6' onClick={() => setIsDrawerOpen(true)} />
            </div>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className='z-[100000]'>
                    <DrawerHeader>
                        <DrawerTitle>Deviens Premium</DrawerTitle>
                        <DrawerClose className='absolute right-4 top-4'>
                            <XMarkIcon />
                        </DrawerClose>
                    </DrawerHeader>
                    <Subscription />
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default LandingHeader;
