import ButtonApp from '@/components/ButtonApp';
import { APP_ROUTES_ENUM } from '@/main';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogBottomNav from '../../components/BlogBottomNav';
import CarouselX from '../../components/CarouselX';
import { cardTypesEnum, categories, categoryType, subjectType, subjects } from '../../temp/BlogData';

const ArticleCategory = () => {
    const { id } = useParams<{ id: string }>();
    const [category, setCategory] = useState<categoryType | null>(null);
    const [cards, setCards] = useState<subjectType[]>([]);

    useEffect(() => {
        setCategory(categories.find((category) => category.id === Number(id)));
        if (category) {
            setCards(subjects.filter((subject) => subject.category === category.title));
        }
    }, [category, id]);

    return (
        <div className='w-full flex justify-center items-center flex-col mb-10'>
            <div className='w-[90%] flex justify-center items-center flex-col gap-y-12'>
                <div className='w-full mt-10 flex justify-center items-center flex-col'>
                    <h1 className='text-3xl font-bold'>{category?.title}</h1>
                </div>
                {cards.length > 0 && category ? (
                    <>
                        <div className='w-full flex justify-between items-start flex-wrap gap-x-4'>
                            <h2 className='text-2xl font-black'>Les plus populaires</h2>
                            <CarouselX
                                slides={cards}
                                options={{ loop: false, containScroll: false }}
                                cardVariant={cardTypesEnum.SMALL_PREVIEW}
                            />
                        </div>

                        <div className='w-full flex justify-between items-start flex-wrap gap-x-4'>
                            <h2 className='text-2xl font-black'>Les plus populaires</h2>
                            <CarouselX
                                slides={cards}
                                options={{ loop: false, containScroll: false }}
                                cardVariant={cardTypesEnum.SMALL_PREVIEW}
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
