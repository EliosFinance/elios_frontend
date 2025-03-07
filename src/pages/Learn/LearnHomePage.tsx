import { getArticleCategories, getArticles, getLikedArticles, getTrendingArticles } from '@/api';
import CarouselX from '@/components/CarouselX';
import GetPremium from '@/components/GetPremium';
import InputApp from '@/components/InputApp';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArticleCategoryType, ArticleType, ArticleTypesEnum } from '@/types/BlogType';
import { useEffect, useState } from 'react';

const LearnHomePage = () => {
    const [search, setSearch] = useState<string>('');
    const [filteredSubjects, setFilteredSubjects] = useState<ArticleType[]>([]);
    const [isUserTyping, setIsUserTyping] = useState<boolean>(false);
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [trendingArticles, setTrendingArticles] = useState<ArticleType[]>([]);
    const [premiumArticles, setPremiumArticles] = useState<ArticleType[]>([]);
    const [recommendedArticles, setRecommendedArticles] = useState<ArticleType[]>([]);
    const [likedArticles, setLikedArticles] = useState<ArticleType[]>([]);
    const [articlesCategories, setArticlesCategories] = useState<ArticleCategoryType[]>([]);

    useEffect(() => {
        if (search.length > 2 && articles.length > 0) {
            setIsUserTyping(true);
            const filtered = articles.filter((subject) => subject.title.toLowerCase().includes(search.toLowerCase()));
            setFilteredSubjects(filtered);
        } else {
            setIsUserTyping(false);
        }
    }, [search]);

    useEffect(() => {
        const loadDatas = async () => {
            if (articles.length === 0) {
                const articles = await getArticles();
                const trendingArticles = await getTrendingArticles();
                // const premiumArticles =  await getPremiumArticles()
                // const recommendedArticles =  await getRecommendedArticles()
                const likedArticles = await getLikedArticles();
                setArticles(articles);
                setTrendingArticles(trendingArticles);
                setPremiumArticles(articles);
                setRecommendedArticles(articles);
                setLikedArticles(likedArticles);
            }
            if (articlesCategories.length === 0) {
                const articleCategories = await getArticleCategories();
                setArticlesCategories(articleCategories);
            }
        };
        loadDatas();
    }, []);

    const SliderSection = (title: string, articles: ArticleType[], last: boolean) => {
        return (
            <div className='flex flex-col items-start justify-center w-full'>
                <h2 className='px-6 text-2xl font-black'>{title}</h2>
                <div
                    className={`w-full flex justify-between items-start flex-wrap gap-y-4 gap-x-4 ${last ? 'pb-24' : ''}`}
                >
                    <CarouselX
                        slides={articles}
                        options={{ loop: true, containScroll: false }}
                        cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-y-12'>
            <div className='flex flex-col items-start justify-center w-full px-6 pt-12'>
                <h2 className='text-2xl font-black'>EliosLearn</h2>
                <InputApp
                    type='text'
                    placeholder='Recherchez une idée, un sujet, ...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => setSearch('')}
                    endIcon
                />
            </div>

            {isUserTyping ? (
                <div className='w-full h-[70%] flex justify-center items-center flex-col'>
                    <h2 className='text-2xl font-black'>Résultats de recherche</h2>
                    <div className='flex flex-wrap items-start justify-between w-full gap-y-4 gap-x-4'>
                        <CarouselX
                            slides={filteredSubjects}
                            options={{ loop: false, containScroll: false }}
                            cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div className='flex flex-col items-start justify-center w-full px-6'>
                        <div className='flex items-center justify-between w-full'>
                            <h2 className='text-2xl font-black'>Pour vous</h2>
                            <a
                                className='text-sm font-semibold text-blue-500'
                                href={APP_ROUTES_ENUM.ARTICLE_CATEGORIES}
                            >
                                Voir tout &gt;
                            </a>
                        </div>
                        <div className='flex flex-wrap items-start justify-between w-full mt-3 gap-y-4 gap-x-4'>
                            {[1, 2, 3, 4].map((i) => (
                                <a
                                    className='w-[47.6%] h-12 flex justify-center items-center bg-blue-500 rounded-3 text-white font-semibold text-lg'
                                    href={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/${i}`}
                                    key={i}
                                >
                                    {articlesCategories[i]?.title}
                                </a>
                            ))}
                        </div>
                    </div>

                    {SliderSection('Les plus populaires', trendingArticles, false)}
                    {SliderSection('Contenu premium', premiumArticles, false)}
                    {SliderSection('Recommandations', recommendedArticles, false)}
                    {SliderSection('Mes likes', likedArticles, false)}
                    {SliderSection('Laissez vous porter...', articles, true)}
                </>
            )}
        </div>
    );
};

export default LearnHomePage;
