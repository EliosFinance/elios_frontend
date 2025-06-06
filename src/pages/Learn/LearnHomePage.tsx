import { getAllQuizz, getArticleCategories, getArticles, getLikedArticles, getTrendingArticles } from '@/api';
import InputApp from '@/components/InputApp';
import CardCarousel from '@/components/carousels/CardCarousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLearnStore } from '@/store/LearnStore';
import { QuizzType } from '@/temp/QuizzData';
import { ArticleCategoryType, ArticleType, ArticleTypesEnum } from '@/types/BlogType';
import { useEffect, useState } from 'react';
import LearnArticleTab from './LearnArticleTab';
import LearnQuizzTab from './LearnQuizzTab';

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

    const [quizz, setQuizz] = useState<QuizzType[]>([]);
    const { panelSelected, setPanelSelected } = useLearnStore();

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
                // const premiumArticles =  await getPremiumArticles()  TODO: premium articles
                // const recommendedArticles =  await getRecommendedArticles() TODO: recommended articles
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
            if (quizz.length === 0) {
                const quizz = await getAllQuizz();
                setQuizz(quizz);
            }
        };
        loadDatas();
    }, []);

    const handleClick = (target: string) => {
        setPanelSelected(target);
        setSearch('');
        setIsUserTyping(false);
        setFilteredSubjects([]);
    };

    return (
        <div className='flex flex-col items-center justify-center w-full h-full gap-y-4'>
            {/* <FinishedChallengeAnimation challenge={challengeData[0]} /> */}
            <div className='flex flex-col items-start justify-center w-full px-6 pt-12'>
                <h1 className='text-primary-500'>Elios Learn</h1>
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
                    <h2 className='font-black'>Résultats de recherche</h2>
                    <div className='flex flex-wrap items-start justify-between w-full gap-y-4 gap-x-4'>
                        <CardCarousel
                            slides={filteredSubjects}
                            options={{ loop: false, containScroll: false }}
                            cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                        />
                    </div>
                </div>
            ) : (
                <Tabs value={panelSelected} className='w-full grid-cols-2'>
                    <TabsList className='w-full flex justify-center items-center gap-x-4 px-6 border-b-2 rounded-none'>
                        <TabsTrigger value='articles' onClick={() => handleClick('articles')}>
                            Articles
                        </TabsTrigger>
                        <TabsTrigger value='quizz' onClick={() => handleClick('quizz')}>
                            Quizz
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='articles'>
                        <LearnArticleTab
                            articles={articles}
                            trendingArticles={trendingArticles}
                            premiumArticles={premiumArticles}
                            recommendedArticles={recommendedArticles}
                            likedArticles={likedArticles}
                            articlesCategories={articlesCategories}
                        />
                    </TabsContent>
                    <TabsContent value='quizz'>
                        <LearnQuizzTab quizz={quizz} />
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
};

export default LearnHomePage;
