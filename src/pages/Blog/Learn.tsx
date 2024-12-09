import { getArticles } from '@/api';
import InputApp from '@/components/InputApp';
import { APP_ROUTES_ENUM } from '@/main';
import { sub } from 'date-fns';
import React, { useEffect, useState } from 'react';
import CarouselX from '../../components/CarouselX';
import { ArticleCategoriesEnum, ArticleType, ArticleTypesEnum } from '../../types/BlogType';

const Learn = () => {
    const [search, setSearch] = useState<string>('');
    const [filteredSubjects, setFilteredSubjects] = useState<ArticleType[]>([]);
    const [isUserTyping, setIsUserTyping] = useState<boolean>(false);
    const [articles, setArticles] = useState<ArticleType[]>([]);

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
            if (articles.length > 0) return;
            const subjects = await getArticles();
            setArticles(subjects);
        };
        loadDatas();
    }, []);

    return (
        <div className='w-full flex justify-center items-center flex-col gap-y-12'>
            <div className='w-full flex justify-center items-start flex-col px-6'>
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
                    <div className='w-full flex justify-between items-start flex-wrap gap-y-4 gap-x-4'>
                        <CarouselX
                            slides={filteredSubjects}
                            options={{ loop: false, containScroll: false }}
                            cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div className='w-full flex justify-center items-start flex-col px-6'>
                        <div className='w-full flex justify-between items-center'>
                            <h2 className='text-2xl font-black'>Pour vous</h2>
                            <a
                                className='text-sm font-semibold text-blue-500'
                                href={APP_ROUTES_ENUM.ARTICLE_CATEGORIES}
                            >
                                Voir tout &gt;
                            </a>
                        </div>
                        <div className='w-full flex justify-between items-start flex-wrap mt-3 gap-y-4 gap-x-4'>
                            {[1, 2, 3, 4].map((i) => (
                                <a
                                    className='w-[47.6%] h-12 flex justify-center items-center bg-blue-500 rounded-3 text-white font-semibold text-lg'
                                    href={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/${i}`}
                                    key={i}
                                >
                                    {Object.values(ArticleCategoriesEnum)[i]}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className='w-full flex justify-center items-start flex-col'>
                        <h2 className='text-2xl font-black px-6'>Les plus populaires</h2>
                        <div className='w-full flex justify-between items-start flex-wrap gap-y-4 gap-x-4'>
                            <CarouselX
                                slides={articles}
                                options={{ loop: false, containScroll: false }}
                                cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Learn;
