import { getTrendingArticles, useGetConnections } from '@/api';
import BlurItem from '@/components/BlurItem';
import { ChartSkeleton } from '@/components/ChartSkeleton';
import GetPremium from '@/components/GetPremium';
import Subscription from '@/components/UpgradePlan';
import UserAnalytics from '@/components/UserAnalytics';
import CardCarousel from '@/components/carousels/CardCarousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import LandingHeader from '@/components/landing/Header';
import MonthlySubscriptions from '@/components/landing/MonthlySubscriptions';
import WeekChart from '@/components/landing/WeekChart';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import WidgetContainer from '@/components/widgets/WidgetContainer';
import { useAuth } from '@/context/AuthProvider';
import useLoggedUser from '@/hook/useLoggedUser';
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
    const [friendsLoading, setFriendsLoading] = useState<boolean>(true);
    const { user } = useAuth();
    const { getFullLoggedUser } = useLoggedUser();
    const {
        data: connections,
        isLoading: isLoadingConnections,
        isFetching: isFetchingConnections,
    } = useGetConnections();

    useEffect(() => {
        const fetchUser = async () => {
            if (articles.length === 0) {
                const articles = await getTrendingArticles();
                setArticles(articles || []);
            }

            if (friends.length === 0) {
                setFriendsLoading(true);
                // Données d'amis fictifs pour la démo (avec statut en ligne/hors ligne)
                const demoFriends: (FriendsType & { isOnline: boolean })[] = [
                    {
                        id: "1",
                        username: "Emma",
                        email: "emma.dubois@student.fr",
                        avatarUrl: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        isOnline: true,
                        friends: [],
                        articles: [],
                        likedArticles: [],
                        readArticles: [],
                        transactions: [],
                        userToChallenge: []
                    },
                    {
                        id: "2", 
                        username: "Lucas",
                        email: "lucas.martin@student.fr",
                        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                        isOnline: false,
                        friends: [],
                        articles: [],
                        likedArticles: [],
                        readArticles: [],
                        transactions: [],
                        userToChallenge: []
                    },
                    {
                        id: "3",
                        username: "Chloé",
                        email: "chloe.leroy@student.fr", 
                        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                        isOnline: true,
                        friends: [],
                        articles: [],
                        likedArticles: [],
                        readArticles: [],
                        transactions: [],
                        userToChallenge: []
                    },
                    {
                        id: "4",
                        username: "Antoine",
                        email: "antoine.moreau@student.fr",
                        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                        isOnline: true,
                        friends: [],
                        articles: [],
                        likedArticles: [],
                        readArticles: [],
                        transactions: [],
                        userToChallenge: []
                    },
                    {
                        id: "5",
                        username: "Sophie",
                        email: "sophie.bernard@student.fr",
                        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
                        isOnline: false,
                        friends: [],
                        articles: [],
                        likedArticles: [],
                        readArticles: [],
                        transactions: [],
                        userToChallenge: []
                    },
                    {
                        id: "6",
                        username: "Thomas",
                        email: "thomas.petit@student.fr",
                        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                        isOnline: true,
                        friends: [],
                        articles: [],
                        likedArticles: [],
                        readArticles: [],
                        transactions: [],
                        userToChallenge: []
                    }
                ];
                setTimeout(() => {
                    setFriendsLoading(false);
                    setFriends(demoFriends);
                }, 1000);
                return;
                
                // Code API original commenté
                // const fullUser = await getFullLoggedUser();
                // setFriendsLoading(false);
                // setFriends((fullUser?.friends as any) || []);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className='flex flex-col items-center w-full gap-8 pt-8 mb-32'>
            <div className='flex flex-col items-start w-full gap-4 px-6'>
                <LandingHeader />
                <h1 className='mt-4 font-bold text-primary-500'>
                    Bienvenue, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                </h1>
            </div>

            <BlurItem
                locked={!isLoadingConnections && !isFetchingConnections && !connections?.length}
                isLoading={isLoadingConnections || isFetchingConnections}
                onClick={() => navigate(APP_ROUTES_ENUM.CONNECT_BANK_ACCOUNT)}
                loadingItem={<ChartSkeleton header='La semaine dernière' />}
                variant='connectAccount'
                className='w-full min-h-[300px]'
            >
                <WeekChart className={'px-6'} />
            </BlurItem>

            <UserAnalytics />

            <div className='w-full px-6'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='font-bold'>Abonnements du mois</h2>
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
                    locked={!isLoadingConnections && !isFetchingConnections && !connections?.length}
                    isLoading={isLoadingConnections || isFetchingConnections}
                    onClick={() => navigate(APP_ROUTES_ENUM.SUBSCRIPTION)}
                    variant='connectAccount'
                    className='w-full h-auto'
                >
                    <MonthlySubscriptions />
                </BlurItem>
            </div>

            <div className='w-full px-6'>
                <h2 className='mb-4 font-bold'>Aujourd'hui</h2>
                <GetPremium onTopUpClick={() => setIsDrawerOpen(true)} />
            </div>

            <div className='w-full'>
                <div className='flex items-center justify-between px-6 mb-4'>
                    <h2 className='font-bold text-white'>Mes amis</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => navigate(APP_ROUTES_ENUM.FRIENDS)}
                        className='rounded-xl hover:bg-white/10'
                    >
                        <ArrowRightIcon className='w-5 h-5 text-white' />
                    </Button>
                </div>
                
                {friendsLoading ? (
                    <div className='flex justify-center items-center h-[200px] bg-white/5 rounded-xl border border-white/10 mx-6'>
                        <div className='w-8 h-8 border-b-2 border-white rounded-full animate-spin'></div>
                    </div>
                ) : (
                    <div className="px-6">
                        <Carousel 
                            opts={{
                                align: "start",
                                loop: false,
                                dragFree: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-2">
                                {friends.map((friend) => (
                                    <CarouselItem key={friend.id} className="pl-2 pr-2 basis-1/2">
                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer h-[240px] flex flex-col items-center justify-center">
                                            <div className="relative mb-4">
                                                <img 
                                                    src={friend.avatarUrl} 
                                                    alt={friend.username}
                                                    className="object-cover w-20 h-20 border-2 rounded-full border-white/20"
                                                />
                                                <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-gray-900 ${
                                                    (friend as any).isOnline ? 'bg-green-500' : 'bg-gray-500'
                                                }`}></div>
                                            </div>
                                            <h3 className="px-2 mb-1 text-sm font-semibold text-center text-white">{friend.username}</h3>
                                            <p className="px-2 mb-3 text-xs text-center text-gray-400">{friend.email.split('@')[0]}</p>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className={`w-2 h-2 rounded-full ${
                                                    (friend as any).isOnline ? 'bg-green-500' : 'bg-gray-500'
                                                }`}></span>
                                                <span className={`${
                                                    (friend as any).isOnline ? 'text-green-400' : 'text-gray-400'
                                                }`}>
                                                    {(friend as any).isOnline ? 'En ligne' : 'Hors ligne'}
                                                </span>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                )}
            </div>

            <div className='w-full'>
                <div className='flex items-center justify-between px-6 mb-4'>
                    <h2 className='font-bold'>Apprendre avec EliosLearn !</h2>
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
                    isLoading={!articles.length}
                    options={{ loop: false, containScroll: false, align: 'start' }}
                    cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                    sx='pl-6'
                />
            </div>

            <WidgetContainer />

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
