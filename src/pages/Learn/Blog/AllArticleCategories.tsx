import { getArticleCategories } from '@/api';
import BlogNav from '@/components/BlogNav';
import { Card } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
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
		<div className='flex flex-col items-center justify-start w-full min-h-screen px-6 pt-6'>
			<div className='flex items-center gap-3 mb-4'>
				<BookOpen className='w-6 h-6 text-primary-500' />
				<h1 className='text-2xl font-bold'>Catégories d’articles</h1>
			</div>

			<div className='grid w-full grid-cols-2 gap-4 pb-32 mt-4 sm:grid-cols-3 lg:grid-cols-4'>
				{articleCategories.map((category) => (
					<a
						key={category.id}
						href={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/${category.id}`}
						className='group'
					>
						<Card className='flex flex-col items-center justify-center h-40 gap-2 overflow-hidden transition-colors group-hover:border-primary-500'>
							<img
								src={category.icon}
								alt={category.title}
								className='object-cover w-16 h-16 rounded-md shadow-lg'
							/>
							<h3 className='px-2 font-semibold text-center transition-colors group-hover:text-primary-500'>
								{category.title}
							</h3>
						</Card>
					</a>
				))}
			</div>

			<BlogNav disableActionButtons backUrl={APP_ROUTES_ENUM.LEARN} />
		</div>
	);
};

export default AllArticleCategories;