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
        <div className='flex flex-col items-center justify-center w-full h-full px-6'>
            <div className='flex flex-col items-start justify-start w-full pb-24 mb-12 gap-y-4'>
                <h2 className='w-full mt-10 mb-2 text-2xl font-black'>Toutes les catégories</h2>
                {articleCategories.length > 0 &&
                    articleCategories.map((category, index) => (
                        <a
                            href={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/${category.id}`}
                            className='flex items-center justify-between w-full h-12 px-6 text-xl font-semibold text-white bg-blue-500 rounded-3'
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
