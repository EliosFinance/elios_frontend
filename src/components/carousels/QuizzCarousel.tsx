import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useRef } from 'react';
import '@/css/carousels/carousel-x.css';
import { useAuth } from '@/context/AuthProvider';
import { QuizzType } from '@/temp/QuizzData';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from 'lucide-react';
import { useCardStyles } from '../Card';
import LoaderCarousel from './LoaderCarousel';
const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

type PropType = {
    slides: QuizzType[];
    isLoading: boolean;
    options?: EmblaOptionsType;
};

const QuizzCarousel: React.FC<PropType> = (props) => {
    const { user } = useAuth();
    const { slides, options, isLoading } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);
    const styles = useCardStyles(0);

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

    return (
        <>
            {isLoading ? (
                <LoaderCarousel options={options} />
            ) : (
                <div className='embla'>
                    <div className='embla__viewport' ref={emblaRef}>
                        <div className='embla__container'>
                            {slides.map((q: QuizzType, index: number) => (
                                <div className='embla__slide' key={index}>
                                    <div
                                        className={[styles.card, styles.preview, 'embla__slide__number'].join(' ')}
                                        id={String(q.id!)}
                                    >
                                        {/* header */}
                                        <div className='w-full h-[7%] flex justify-between items-center mt-5 px-5'>
                                            <div className='flex items-center justify-start w-auto h-full text-sm font-light text-center gap-x-2'>
                                                {q?.finishers?.some(
                                                    (r: any) =>
                                                        r.username === user.username || r.email === user.username,
                                                ) ? (
                                                    <CheckCircleIcon className='h-[20px] text-green-500' />
                                                ) : (
                                                    <XMarkIcon className='h-[20px] text-red-500' />
                                                )}
                                            </div>
                                            {q?.finishers?.find(
                                                (r: any) => r.username === user.username || r.email === user.username,
                                            ) && (
                                                <div className='flex items-center justify-center w-auto h-full text-sm font-light text-center gap-x-2'>
                                                    <p className='text-gray-500'>Dernier score</p>
                                                    <p className='font-bold'>
                                                        {
                                                            q?.finishers?.find(
                                                                (r: any) =>
                                                                    r.username === user.username ||
                                                                    r.email === user.username,
                                                            ).lastScore
                                                        }
                                                        /{q.questions.length}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* body */}
                                        <a
                                            className='flex flex-col items-center justify-center w-full h-full gap-y-4'
                                            href={`${APP_ROUTES_ENUM.QUIZZ}/${q.id}`}
                                        >
                                            <img
                                                src={q.image}
                                                alt='project thumbnail'
                                                className='h-[125px] w-[45%] rounded-[var(--border-radius-5)] shadow-lg object-cover'
                                            />
                                            <div className='flex flex-col items-center justify-center w-full h-auto gap-y-2'>
                                                <p className='text-lg'>{q.title}</p>
                                                <div className='flex items-center justify-center w-full gap-x-1'>
                                                    <img
                                                        src={q.image}
                                                        alt='project thumbnail'
                                                        className='h-[20px] w-[20px] object-cover'
                                                    />
                                                    <p
                                                        className={
                                                            q.difficulty === 'easy'
                                                                ? 'text-green-500 font-bold text-sm'
                                                                : q.difficulty === 'medium'
                                                                  ? 'text-yellow-500 font-bold text-sm'
                                                                  : 'text-red-500 font-bold text-sm'
                                                        }
                                                    >
                                                        {q.difficulty}
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuizzCarousel;
