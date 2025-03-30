import GetPremium from '@/components/GetPremium';
import Subscription from '@/components/UpgradePlan';
import WidgetContainer from '@/components/WidgetContainer';
import BlogPosts from '@/components/landing/BlogPosts';
import Friends from '@/components/landing/Friends';
import LandingHeader from '@/components/landing/Header';
import MonthlySubscriptions from '@/components/landing/MonthlySubscriptions';
import WeekChart from '@/components/landing/WeekChart';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthProvider';
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const { user } = useAuth();

    return (
        <div className='flex flex-col items-center w-full px-4 pt-8 mb-32 space-y-8'>
            <div className='flex flex-col items-start w-full gap-4'>
                <LandingHeader />
                <h1 className='mt-4 mb-4 text-2xl font-bold'>
                    Bienvenue, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                </h1>
            </div>

            <WeekChart />

            <div className='w-full'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-xl font-bold'>Abonnements du mois</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => navigate('/subscriptions')}
                        className='rounded-xl hover:bg-gray-100'
                    >
                        <ArrowRightIcon className='w-5 h-5' />
                    </Button>
                </div>
                <MonthlySubscriptions />
            </div>

            <div className='w-full'>
                <h2 className='mb-4 text-xl font-bold'>Aujourd'hui</h2>
                <GetPremium onTopUpClick={() => setIsDrawerOpen(true)} />
            </div>

            <div className='w-full'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-xl font-bold'>Mes amis</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => navigate('/friends')}
                        className='rounded-xl hover:bg-gray-100'
                    >
                        <ArrowRightIcon className='w-5 h-5' />
                    </Button>
                </div>
                <Friends />
            </div>

            <div className='w-full'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-xl font-bold'>Apprendre avec EliosLearn !</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => navigate('/articles')}
                        className='rounded-xl hover:bg-gray-100'
                    >
                        <ArrowRightIcon className='w-5 h-5' />
                    </Button>
                </div>
                <BlogPosts />
            </div>

            <WidgetContainer />

            <Separator className='mt-20' />
            <Separator className='mt-20' />
            <Separator className='mt-20' />

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

export default Landing;
