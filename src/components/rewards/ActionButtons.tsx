// components/ActionButtons.tsx
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '../ui/button';

const ActionButtons = () => {
    return (
        <div className='flex justify-between mb-4 gap-2'>
            <Button className='flex-1 px-4 py-2 mr-2 h-12 text-white bg-blue-500 rounded-lg text-lg'>Activité</Button>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button className='flex-1 px-4 py-2 h-12 text-white bg-blue-500 rounded-lg text-lg'>
                        Comment ça marche
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Comment ça marche</DrawerTitle>
                        <DrawerClose className='absolute top-4 right-4'>
                            <Button className='text-gray-500'>Close</Button>
                        </DrawerClose>
                    </DrawerHeader>
                    <div className='p-4'>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                        <p>Explaining text goes here...</p>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default ActionButtons;
