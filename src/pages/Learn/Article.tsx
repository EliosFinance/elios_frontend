import { getSingleArticle, readArticle, readArticleContent } from '@/api';
import BlogNav from '@/components/BlogNav';
import { Card } from '@/components/Card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthProvider';
import useConfettis from '@/hook/useConfettis';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArticleType, ArticleTypesEnum } from '@/types/BlogType';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Article = () => {
    const [currentArticle, setCurrentArticle] = useState<ArticleType | null>(null);
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const ref = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement | null>(null);
    const cardElements = useRef<(HTMLDivElement | null)[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [clickedCard, setClickedCard] = useState<number | null>(null);
    const { throwConfettis, throwPartyConfettis } = useConfettis();
    const navigate = useNavigate();

    const removeClassList = (el: HTMLDivElement) => {
        el?.classList.remove('filter', 'grayscale', 'opacity-50', 'transform', 'scale-[90%]');
    };

    const addClassList = (el: HTMLDivElement) => {
        el?.classList.add('filter', 'grayscale', 'opacity-50', 'transform', 'scale-[90%]');
    };

    const handleRead = async (contentId: number) => {
        if (!contentId) return;
        await readArticleContent(Number(contentId));

        const article = await getSingleArticle(currentArticle.id);

        // if every reads contains user id, then throw confettis
        if (
            article.articleContent.every((content) =>
                content.reads.some((r) => r.username === user.username || r.email === user.username),
            )
        ) {
            await readArticle(currentArticle.id);
            throwPartyConfettis();
        }
    };

    useLayoutEffect(() => {
        const loadDatas = async () => {
            if (!id) return;
            const response = await getSingleArticle(Number(id));

            if (response.id === undefined) {
                navigate(APP_ROUTES_ENUM.LEARN);
            }

            setCurrentArticle(response);
        };
        loadDatas();
    }, [id]);

    useEffect(() => {
        if (!currentArticle || !cardsRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cardsRef.current?.classList.add('overflow-y-scroll');
                    cardsRef.current?.classList.remove('overflow-y-hidden');
                } else {
                    cardsRef.current?.classList.add('overflow-y-hidden');
                    cardsRef.current?.classList.remove('overflow-y-scroll');
                }
            },
            { root: null, threshold: 0 },
        );

        const observer2 = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const targetElement = entry.target as HTMLDivElement;

                        const currentItemIndex = Number(targetElement.id.split('_')[1]);

                        if (timeoutRef.current || targetElement.id === 'header') {
                            clearTimeout(timeoutRef.current);
                        }

                        timeoutRef.current = setTimeout(() => {
                            setClickedCard(currentItemIndex);
                        }, 300);

                        cardElements.current.forEach((el, i) => {
                            if (el) {
                                if (i === currentItemIndex) {
                                    removeClassList(el);
                                } else {
                                    addClassList(el);
                                }
                            }
                        });
                    }
                });
            },
            { root: cardsRef.current, threshold: 0.6 },
        );

        observer.observe(cardsRef.current);
        cardElements.current.forEach((el) => {
            if (el) {
                observer2.observe(el);
            }
        });

        return () => {
            observer.disconnect();
            observer2.disconnect();
        };
    }, [currentArticle, clickedCard]);

    const handleCardClick = (index: number) => {
        const cardElement = cardElements.current[index];
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Gérer les classes après le scroll
            setTimeout(() => {
                cardElements.current.forEach((el, i) => {
                    if (el) {
                        if (i === index) {
                            removeClassList(el);
                        } else {
                            addClassList(el);
                        }
                    }
                });
            }, 300);
        }
    };

    const formatLectures = (readsLength: number) => {
        const lectures = readsLength === 1 ? 'lecture' : 'lectures';
        if (readsLength < 1000) return `${readsLength} ${lectures}`;
        if (readsLength < 1000000) return `${(readsLength / 1000).toFixed(1)}k  ${lectures}`;
        return `${(readsLength / 1000000).toFixed(1)}M  ${lectures}`;
    };

    if (!currentArticle) return <div>Loading...</div>;

    return (
        <>
            {currentArticle && <BlogNav article={currentArticle} currentCard={clickedCard || 0} />}
            <div ref={ref} className='flex flex-col items-center justify-center w-full mb-10'>
                <div className='w-[90%] flex justify-center items-center flex-col'>
                    <div
                        className='w-[100vw] h-[100vh] flex justify-center items-center flex-wrap snap-y snap-mandatory overflow-y-hidden scrollbars-hidden mt-4 px-4 mb-12'
                        ref={cardsRef}
                    >
                        {/* header */}
                        <div
                            className='flex flex-col items-center justify-center w-full h-auto mt-24 font-bold gap-y-8 snap-center'
                            id='header'
                        >
                            <Skeleton className='h-[70px] w-[70px] rounded-[var(--border-radius-5)]' />
                            <img
                                src={currentArticle.thumbnail}
                                alt='project thumbnail'
                                className='h-[250px] object-cover w-[70%] rounded-[var(--border-radius-5)] shadow-lg'
                                onClick={throwConfettis}
                                loading='lazy'
                            />
                            <div className='flex flex-col items-center justify-center w-full h-auto gap-y-2'>
                                <p className='text-lg'>{currentArticle.title}</p>
                                <div className='flex items-center justify-center w-full gap-x-1'>
                                    <img
                                        src={currentArticle.thumbnail}
                                        alt='project thumbnail'
                                        className='h-[20px] w-[20px] object-cover'
                                    />
                                    <p className='text-sm'>~{currentArticle.readingTime}</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center w-full h-auto gap-y-2'>
                                {/* separator */}
                                <span className='w-[70%] h-[2px] bg-black rounded-full mt-12'></span>

                                {/* content */}
                                <div className='flex flex-col items-center justify-center w-full h-auto mt-12'>
                                    <p className='text-justify'>{currentArticle.description}</p>
                                </div>

                                {/* card container */}
                                <div className='flex items-center justify-between w-full h-auto mt-12 font-bold'>
                                    <p>{currentArticle.articleContent?.length || 0} ideas</p>
                                    <p>{formatLectures(currentArticle?.reads.length || 0)}</p>
                                </div>
                            </div>
                        </div>

                        {currentArticle?.articleContent?.map((card, i) => (
                            <Card
                                id={`card_${i}`}
                                article={currentArticle}
                                variant={card.type}
                                cardToDisplay={i}
                                classNames={['transition-all', 'duration-300', 'snap-center', 'my-4']}
                                key={i}
                                ref={(el) => (cardElements.current[i] = el)}
                                onClick={() => handleCardClick(i)}
                                cardFocused={clickedCard === i}
                                userHasRead={(hasRead) => handleRead(hasRead)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Article;
