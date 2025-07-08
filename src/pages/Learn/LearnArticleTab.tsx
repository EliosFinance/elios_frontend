import BlurItem from '@/components/BlurItem';
import Subscription from '@/components/UpgradePlan';
import CardCarousel from '@/components/carousels/CardCarousel';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Skeleton } from '@/components/ui/skeleton';
import useLoggedUser from '@/hook/useLoggedUser';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArticleCategoryType, ArticleType, ArticleTypesEnum } from '@/types/BlogType';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

type LearnArticleTabProps = {
    articles: ArticleType[];
    trendingArticles: ArticleType[];
    premiumArticles: ArticleType[];
    recommendedArticles: ArticleType[];
    likedArticles: ArticleType[];
    articlesCategories: ArticleCategoryType[];
};

const LearnArticleTab = (props: LearnArticleTabProps) => {
    const [isPremium, setIsPremium] = useState<boolean>(false);
    const { getFullLoggedUser } = useLoggedUser();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const SliderSection = (title: string, articles: ArticleType[], premium: boolean, last: boolean) => {
        return (
            <div className='w-full flex justify-center items-start flex-col'>
                <h2 className='font-black px-6'>{title}</h2>
                <BlurItem
                    isLoading={false}
                    locked={premium && !isPremium}
                    onClick={() => {
                        if (premium && !isPremium) {
                            setIsDrawerOpen(true);
                        }
                    }}
                    variant='premium'
                    className='w-full'
                >
                    <div
                        className={`w-full flex justify-between items-start flex-wrap gap-y-4 gap-x-4 ${last ? 'pb-24' : 'pb-8'}`}
                    >
                        <CardCarousel
                            slides={articles}
                            options={{ loop: true, containScroll: false }}
                            cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                            isLoading={!articles.length}
                        />
                    </div>
                </BlurItem>
            </div>
        );
    };

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getFullLoggedUser();
            setIsPremium(user?.isPremium || false);
        };
        fetchUser();
    }, []);

    return (
        <>
            <div className='w-full flex justify-center items-start flex-col mb-8 pt-6'>
                <div className='w-full flex justify-between items-center'>
                    <h2 className='font-black px-6'>Catégories</h2>
                    <a className='text-sm font-semibold text-blue-500 px-6' href={APP_ROUTES_ENUM.ARTICLE_CATEGORIES}>
                        Voir tout &gt;
                    </a>
                </div>
                <div className='w-full overflow-x-auto scrollbar-hide mt-2 mb-3'>
                    <div className='flex space-x-4 snap-x snap-mandatory overflow-x-auto px-6'>
                        {props.articlesCategories.length
                            ? props.articlesCategories.map((category) => (
                                  <a
                                      key={category.id}
                                      href={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/${category.id}`}
                                      className='py-2 px-6 bg-blue-500 text-white rounded-full font-semibold text-lg flex-shrink-0 snap-center'
                                  >
                                      {category.title}
                                  </a>
                              ))
                            : [...Array(10)].map((_, index) => (
                                  <Skeleton
                                      key={index}
                                      className='h-10 !w-32 rounded-full bg-gray-500 flex-shrink-0 snap-center skeleton-loader'
                                      style={{ borderRadius: 'var(--border-radius-8)' }}
                                  />
                              ))}
                    </div>
                </div>
            </div>

            {SliderSection('Les plus populaires', props.trendingArticles, false, false)}
            {SliderSection('Contenu premium', props.premiumArticles, true, false)}
            {SliderSection('Recommandations', props.recommendedArticles, false, false)}
            {SliderSection('Mes likes', props.likedArticles, false, false)}
            {SliderSection('Laissez vous porter...', props.articles, false, true)}

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className='z-[100000] bg-[#181823]' aria-describedby={undefined}>
                    <DrawerHeader>
                        <DrawerTitle>Deviens Premium</DrawerTitle>
                        <DrawerClose className='absolute right-4 top-4'>
                            <XMarkIcon />
                        </DrawerClose>
                    </DrawerHeader>
                    <Subscription />
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default LearnArticleTab;
