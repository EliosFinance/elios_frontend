import { getSingleArticle, getSingleArticleCategory } from '@/api';
import BlogNav from '@/components/BlogNav';
import ButtonApp from '@/components/ButtonApp';
import CarouselX from '@/components/CarouselX';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArticleCategoryType, ArticleType, ArticleTypesEnum } from '@/types/BlogType';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ArticleCategory = () => {
    const { id } = useParams<{ id: string }>();
    const [category, setCategory] = useState<ArticleCategoryType | null>(null);
    const [cards, setCards] = useState<ArticleType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDatas = async () => {
            if (!id) return;
            const category = await getSingleArticleCategory(Number(id));
            if (category.id === undefined) {
                navigate(APP_ROUTES_ENUM.LEARN);
            }
            setCategory(category);
        };
        loadDatas();
    }, [id]);

    useEffect(() => {
        const loadDatas = async () => {
            if (!category) return;
            const articles: ArticleType[] = [];
            for (const article of category.articles) {
                articles.push(await getSingleArticle(article.id));
            }
            setCards(articles);
        };
        loadDatas();
    }, [category]);

    return (
        <div className='w-full h-full flex justify-center items-center flex-col pb-24'>
            <div className='w-full flex justify-center items-center flex-col gap-y-12 mt-10'>
                <div className='w-full flex justify-start items-center gap-x-4 px-6'>
                    <h1 className='text-4xl font-black w-full'>{category?.title}</h1>
                    <img src={category?.icon} alt={category?.title} className='w-[40px] h-[40px] object-cover' />
                </div>
                <span className='h-[1px] w-[80%] border-solid border-black border-[1px] rounded-full' />
                {cards.length > 0 && category ? (
                    <>
                        <div className='w-full flex justify-center items-center flex-wrap gap-x-4'>
                            <h2 className='text-2xl font-black w-[90%]'>Les plus populaires</h2>
                            <CarouselX
                                slides={cards}
                                options={{ loop: false, containScroll: false }}
                                cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                            />
                        </div>

                        <div className='w-full flex justify-center items-center flex-wrap gap-x-4'>
                            <h2 className='text-2xl font-black w-[90%]'>Les plus populaires</h2>
                            <CarouselX
                                slides={cards}
                                options={{ loop: false, containScroll: false }}
                                cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                            />
                        </div>

                        <BlogNav disableActionButtons backUrl={APP_ROUTES_ENUM.LEARN} />
                    </>
                ) : (
                    <>
                        <h2 className='text-lg font-bold'>Cette catégorie semble vide...</h2>
                        <ButtonApp onClick={() => window.history.back()} color='secondary' size='small'>
                            Retourner en lieu sûr
                        </ButtonApp>
                    </>
                )}
            </div>
        </div>
    );
};

export default ArticleCategory;
