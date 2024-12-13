import { getArticles, getSingleArticleCategory } from '@/api';
import ButtonApp from '@/components/ButtonApp';
import { APP_ROUTES_ENUM } from '@/main';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogBottomNav from '../../components/BlogBottomNav';
import CarouselX from '../../components/CarouselX';
import { ArticleCategoryType, ArticleType, ArticleTypesEnum } from '../../types/BlogType';

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
            const subjects = await getArticles();
            setCards(subjects.filter((subject) => subject.category.title === category.title));
        };
        loadDatas();
    }, [category]);


    return (
        <div className='w-full h-full flex justify-center items-center flex-col'>
            <div className='w-full flex justify-center items-center flex-col gap-y-12 my-10'>
                <h1 className='text-3xl font-bold w-[90%]'>{category?.title}</h1>
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

                        <BlogBottomNav disableActionButtons backUrl={APP_ROUTES_ENUM.LEARN} />
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
