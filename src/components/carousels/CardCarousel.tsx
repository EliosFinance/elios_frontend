import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import '@/css/carousels/carousel-x.css';
import useLoggedUser from '@/hook/useLoggedUser';
import { ArticleType, ArticleTypesEnum } from '@/types/BlogType';
import { XMarkIcon } from '@heroicons/react/24/outline';
import BlurItem from '../BlurItem';
import { Card } from '../Card';
import Subscription from '../UpgradePlan';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import LoaderCarousel from './LoaderCarousel';
const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

type PropType = {
	slides: ArticleType[];
	cardVariant: ArticleTypesEnum;
	isLoading: boolean;
	options?: EmblaOptionsType;
	sx?: string;
};

const CardCarousel: React.FC<PropType> = (props) => {
	const { slides, options, isLoading } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options);
	const tweenFactor = useRef(0);
	const tweenNodes = useRef<HTMLElement[]>([]);
	const [isPremium, setIsPremium] = useState<boolean>(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const { getFullLoggedUser } = useLoggedUser();

	const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
		tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
			return slideNode.querySelector('.embla__slide__number') as HTMLElement;
		});
	}, []);

	const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
		tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
	}, []);

	const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
		const engine = emblaApi.internalEngine();
		const scrollProgress = emblaApi.scrollProgress();
		const slidesInView = emblaApi.slidesInView();
		const isScrollEvent = eventName === 'scroll';

		emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
			let diffToTarget = scrollSnap - scrollProgress;
			const slidesInSnap = engine.slideRegistry[snapIndex];

			slidesInSnap.forEach((slideIndex) => {
				if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

				if (engine.options.loop) {
					engine.slideLooper.loopPoints.forEach((loopItem) => {
						const target = loopItem.target();

						if (slideIndex === loopItem.index && target !== 0) {
							const sign = Math.sign(target);

							if (sign === -1) {
								diffToTarget = scrollSnap - (1 + scrollProgress);
							}
							if (sign === 1) {
								diffToTarget = scrollSnap + (1 - scrollProgress);
							}
						}
					});
				}

				const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
				const scale = numberWithinRange(tweenValue, 0.9, 1).toString();
				const tweenNode = tweenNodes.current[slideIndex];
				tweenNode.style.transform = `scale(${scale})`;
			});
		});
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		setTweenNodes(emblaApi);
		setTweenFactor(emblaApi);
		tweenScale(emblaApi);

		emblaApi
			.on('reInit', setTweenNodes)
			.on('reInit', setTweenFactor)
			.on('reInit', tweenScale)
			.on('scroll', tweenScale)
			.on('slideFocus', tweenScale);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [emblaApi, tweenScale]);

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getFullLoggedUser();
			setIsPremium(user?.isPremium || false);
		};
		fetchUser();
	}, []);

	return (
		<>
			{isLoading ? (
				<LoaderCarousel options={options} />
			) : (
				<>
					<div className='embla'>
						<div className={`embla__viewport ${props.sx}`} ref={emblaRef}>
							<div className='embla__container'>
								{slides.map((project: ArticleType, index: number) => (
									<div className='embla__slide' key={index}>
										<BlurItem
											isLoading={isLoading}
											locked={project.isPremium && !isPremium}
											onClick={() => {
												if (project.isPremium && !isPremium) {
													setIsDrawerOpen(true);
												}
											}}
											variant='premium'
											className='w-full'
										>
											<Card
												article={project}
												variant={props.cardVariant}
												classNames={['embla__slide__number']}
												key={index}
												cardToDisplay={project.id}
												userHasRead={() => {
													return;
												}}
											/>
										</BlurItem>
									</div>
								))}
							</div>
						</div>
					</div>
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<DrawerContent className='z-[100000] bg-[#181823]' aria-describedby={undefined}>
							<DrawerHeader>
								<DrawerTitle>Deviens Premium</DrawerTitle>
								<DrawerClose className='absolute right-4 top-4'>
									<XMarkIcon />
								</DrawerClose>
							</DrawerHeader>
							<Subscription />
						</DrawerContent>
					</Drawer>
				</>
			)}
		</>
	);
};

export default CardCarousel;
