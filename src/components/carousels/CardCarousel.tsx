import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import '@/css/carousels/carousel-x.css';
import useLoggedUser from '@/hook/useLoggedUser';
import { ArticleType, ArticleTypesEnum } from '@/types/BlogType';
import BlurItem from '../BlurItem';
import { Card } from '../Card';
const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

type PropType = {
    slides: ArticleType[];
    cardVariant: ArticleTypesEnum;
    options?: EmblaOptionsType;
    sx?: string;
};

const CardCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);
    const [isPremium, setIsPremium] = useState<boolean>(false);
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
        <div className='embla'>
            <div className={`embla__viewport ${props.sx}`} ref={emblaRef}>
                <div className='embla__container'>
                    {slides.map((project: ArticleType, index: number) => (
                        <div className='embla__slide' key={index}>
                            <BlurItem
                                locked={project.isPremium && !isPremium}
                                onClick={() => alert('TODO: add action')}
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
    );
};

export default CardCarousel;
