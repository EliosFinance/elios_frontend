import { getArticleCategories } from '@/api';
import BlogNav from '@/components/BlogNav';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArticleCategoryType } from '@/types/BlogType';
import { useEffect, useState } from 'react';

const AllArticleCategories = () => {
    const [articleCategories, setArticleCategories] = useState<ArticleCategoryType[]>([]);

    useEffect(() => {
        const loadDatas = async () => {
            if (articleCategories.length > 0) return;
            const categories = await getArticleCategories();
            setArticleCategories(categories);
        };
        loadDatas();
    }, []);

    return (
        <div className='w-full h-full flex justify-center items-center flex-col px-6'>
            <div className='w-full flex justify-start items-start flex-col gap-y-4 mb-12 pb-24'>
                <h2 className='text-2xl font-black mt-10 mb-2 w-full'>Toutes les catégories</h2>
                {articleCategories.length > 0 &&
                    articleCategories.map((category, index) => (
                        <a
                            href={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/${category.id}`}
                            className='w-full h-12 flex px-6 justify-between items-center bg-blue-500 rounded-3 text-white font-semibold text-xl'
                            key={index}
                        >
                            <p>{category.title}</p>
                            <img
                                className='h-[40px] w-[40px] rounded-[var(--border-radius-3)] object-cover'
                                src={category.icon}
                                alt={category.title}
                            />
                        </a>
                    ))}
            </div>
            <BlogNav disableActionButtons backUrl={APP_ROUTES_ENUM.LEARN} />
        </div>
    );
};

export default AllArticleCategories;
