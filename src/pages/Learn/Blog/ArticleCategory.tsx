import { getSingleArticle, getSingleArticleCategory } from '@/api';
import BlogNav from '@/components/BlogNav';
import { Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ButtonApp from '@/components/ButtonApp';
import CardCarousel from '@/components/carousels/CardCarousel';
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
		<div className='flex flex-col items-center justify-center w-full h-full pt-6 pb-24'>
			<div className='flex flex-col items-center justify-center w-full mt-12 gap-y-12'>
				<div className='flex items-center justify-start w-full px-6 gap-x-4'>
					<h1 className='w-full text-4xl font-black'>{category?.title}</h1>
					<img src={category?.icon} alt={category?.title} className='w-[40px] h-[40px] object-cover' />
				</div>
				<span className='h-[1px] w-[80%] border-solid border-white border-[1px] rounded-full' />
				{category ? (
					<>
						<div className='flex flex-wrap items-center justify-center w-full gap-x-4'>
							<h2 className='text-2xl font-black w-[90%]'>Les plus populaires</h2>
							<CardCarousel
								slides={cards}
								options={{ loop: false, containScroll: false }}
								cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
								isLoading={!cards.length}
							/>
						</div>

						<div className='flex flex-wrap items-center justify-center w-full gap-x-4'>
							<h2 className='text-2xl font-black w-[90%]'>Les plus populaires</h2>
							<CardCarousel
								slides={cards}
								options={{ loop: false, containScroll: false }}
								cardVariant={ArticleTypesEnum.SMALL_PREVIEW}
								isLoading={!cards.length}
							/>
						</div>

						<BlogNav disableActionButtons backUrl={APP_ROUTES_ENUM.LEARN} />
					</>
				) : (
					<>
						<h2 className='text-lg font-bold'>Cette catégorie semble vide...</h2>
						<Button variant='default' size='sm' onClick={() => window.history.back()}>
							Retourner en lieu sûr
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default ArticleCategory;
