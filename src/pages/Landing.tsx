import { getTrendingArticles, useGetConnections } from '@/api';
import BlurItem from '@/components/BlurItem';
import GetPremium from '@/components/GetPremium';
import Subscription from '@/components/UpgradePlan';
import CardCarousel from '@/components/carousels/CardCarousel';
import FriendsCarousel from '@/components/carousels/FriendsCarousel';
import LandingHeader from '@/components/landing/Header';
import MonthlySubscriptions from '@/components/landing/MonthlySubscriptions';
import WeekChart from '@/components/landing/WeekChart';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import WidgetContainer from '@/components/widgets/WidgetContainer';
import { useAuth } from '@/context/AuthProvider';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArticleType, ArticleTypesEnum } from '@/types/BlogType';
import { FriendsType } from '@/types/UserType';
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [friends, setFriends] = useState<FriendsType[]>([]);
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const { user } = useAuth();
    const { data: connections } = useGetConnections();

    useEffect(() => {
        const fetchUser = async () => {
            if (articles.length === 0) {
                const articles = await getTrendingArticles();
                setArticles(articles || []);
            }

            if (friends.length === 0) {
                // const fullUser = await getFullLoggedUser();
                // setFriends(fullUser?.friends || []); TODO: Fix this when the backend is ready -> parse friends
                setFriends([]);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className='flex flex-col items-center w-full pt-8 mb-32 space-y-8'>
            <div className='flex flex-col items-start w-full gap-4 px-6'>
                <LandingHeader />
                <h1 className='mt-4 text-2xl font-bold text-primary-500'>
                    Bienvenue, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                </h1>
            </div>

            <BlurItem
                locked={!connections?.length}
                onClick={() => navigate(APP_ROUTES_ENUM.CONNECT_BANK_ACCOUNT)}
                variant='connectAccount'
                className='w-full min-h-[300px]'
            >
                <WeekChart className={'px-6'} />
            </BlurItem>

            <div className='w-full px-6'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-xl font-bold'>Abonnements du mois</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => navigate(APP_ROUTES_ENUM.SUBSCRIPTION)}
                        className='rounded-xl hover:bg-gray-100'
                    >
                        <ArrowRightIcon className='w-5 h-5' />
                    </Button>
                </div>
                <BlurItem
                    locked={!connections?.length}
                    onClick={() => navigate(APP_ROUTES_ENUM.SUBSCRIPTION)}
                    variant='connectAccount'
                    className='w-full h-auto'
                >
                    <MonthlySubscriptions />
                </BlurItem>
            </div>

            <div className='w-full px-6'>
                <h2 className='mb-4 text-xl font-bold'>Aujourd'hui</h2>
                <GetPremium onTopUpClick={() => setIsDrawerOpen(true)} />
            </div>

            <div className='w-full'>
                <div className='flex items-center justify-between mb-4 px-6'>
                    <h2 className='text-xl font-bold'>Mes amis</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => navigate(APP_ROUTES_ENUM.FRIENDS)}
                        className='rounded-xl hover:bg-gray-100'
                    >
                        <ArrowRightIcon className='w-5 h-5' />
                    </Button>
                </div>
                <BlurItem
                    locked={!connections?.length}
                    onClick={() => navigate(APP_ROUTES_ENUM.FRIENDS)}
                    variant='addFriends'
                    className='w-full h-[250px]'
                >
                    <FriendsCarousel slides={friends} />
                </BlurItem>
            </div>

            <div className='w-full'>
                <div className='flex items-center justify-between mb-4 px-6'>
                    <h2 className='text-xl font-bold'>Apprendre avec EliosLearn !</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => navigate(APP_ROUTES_ENUM.LEARN)}
                        className='rounded-xl hover:bg-gray-100'
                    >
                        <ArrowRightIcon className='w-5 h-5' />
                    </Button>
                </div>
                <CardCarousel
                    slides={articles}
                    options={{ loop: false, containScroll: false, align: 'start' }}
                    cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                    sx='pl-6'
                />
            </div>

            <WidgetContainer />

            <Separator className='mt-20' />
            <Separator className='mt-20' />
            <Separator className='mt-20' />

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className='z-[100000] bg-[#181823]'>
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
