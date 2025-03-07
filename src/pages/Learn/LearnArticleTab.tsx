import CarouselX from '@/components/CarouselX';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArticleCategoryType, ArticleType, ArticleTypesEnum } from '@/types/BlogType';

type LearnArticleTabProps = {
    articles: ArticleType[];
    trendingArticles: ArticleType[];
    premiumArticles: ArticleType[];
    recommendedArticles: ArticleType[];
    likedArticles: ArticleType[];
    articlesCategories: ArticleCategoryType[];
};

const LearnArticleTab = (props: LearnArticleTabProps) => {
    const SliderSection = (title: string, articles: ArticleType[], last: boolean) => {
        return (
            <div className='w-full flex justify-center items-start flex-col'>
                <h2 className='text-2xl font-black px-6'>{title}</h2>
                <div
                    className={`w-full flex justify-between items-start flex-wrap gap-y-4 gap-x-4 ${last ? 'pb-24' : 'pb-8'}`}
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
        <>
            <div className='w-full flex justify-center items-start flex-col mb-8 pt-6'>
                <div className='w-full flex justify-between items-center'>
                    <h2 className='text-2xl font-black px-6'>Catégories</h2>
                    <a className='text-sm font-semibold text-blue-500 px-6' href={APP_ROUTES_ENUM.ARTICLE_CATEGORIES}>
                        Voir tout &gt;
                    </a>
                </div>
                <div className='w-full overflow-x-auto scrollbar-hide mt-2 mb-3'>
                    <div className='flex space-x-4 snap-x snap-mandatory overflow-x-auto px-6'>
                        {props.articlesCategories.map((category) => (
                            <a
                                key={category.id}
                                href={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/${category.id}`}
                                className='py-2 px-6 bg-blue-500 text-white rounded-full font-semibold text-lg flex-shrink-0 snap-center'
                            >
                                {category.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {SliderSection('Les plus populaires', props.trendingArticles, false)}
            {SliderSection('Contenu premium', props.premiumArticles, false)}
            {SliderSection('Recommandations', props.recommendedArticles, false)}
            {SliderSection('Mes likes', props.likedArticles, false)}
            {SliderSection('Laissez vous porter...', props.articles, true)}
        </>
    );
};

export default LearnArticleTab;
