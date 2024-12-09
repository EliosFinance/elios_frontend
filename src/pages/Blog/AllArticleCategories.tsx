import { getArticleCategories } from '@/api';
import { APP_ROUTES_ENUM } from '@/main';
import { useEffect, useState } from 'react';
import BlogBottomNav from '../../components/BlogBottomNav';
import { ArticleCategoryType } from '../../types/BlogType';

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
        <div className='w-full h-full flex justify-center items-center flex-col'>
            <div className='w-[80%] flex justify-start items-start flex-col gap-y-4 mb-12'>
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
                                className='h-[70%] rounded-[var(--border-radius-3)]'
                                src={category.icon}
                                alt={category.title}
                            />
                        </a>
                    ))}
            </div>
            <BlogBottomNav disableActionButtons backUrl={APP_ROUTES_ENUM.LEARN} />
        </div>
    );
};

export default AllArticleCategories;
