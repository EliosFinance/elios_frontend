import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './ui/drawer';

type AppDrawerProps = {
    children: React.ReactNode;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    title: string;
};

const AppDrawer = ({ children, isDrawerOpen, setIsDrawerOpen, title }: AppDrawerProps) => {
    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className='z-[100000]'>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription />
                    <DrawerClose className='absolute right-4 top-4'>
                        <XMarkIcon />
                    </DrawerClose>
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    );
};

export default AppDrawer;
