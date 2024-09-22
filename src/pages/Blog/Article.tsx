import { useParams } from 'react-router-dom';
import { subjects, subjectType } from './temp/data';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {Card} from './Card';
import BottomNav from './BottomNav';
import useConfettis from '@/hook/useConfettis';

const Article = () => {
  const [currentArticle, setCurrentArticle] = useState<subjectType | null>(null);
  const { id } = useParams<{ id: string }>();
  const ref = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const cardElements = useRef<(HTMLDivElement | null)[]>([]);
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const { throwConfettis } = useConfettis();

  const removeClassList = (el: HTMLDivElement) => {
    el?.classList.remove('filter', 'grayscale', 'opacity-50', 'transform', 'scale-[90%]');
  };

  const addClassList = (el: HTMLDivElement) => {
    el?.classList.add('filter', 'grayscale', 'opacity-50', 'transform', 'scale-[90%]');
  };

  useLayoutEffect(() => {
    setCurrentArticle(subjects.find((subject) => subject.id === Number(id)));
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
      { root: null, threshold: 0, rootMargin: '0px 0px -100% 0px' }
    );

    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetElement = entry.target as HTMLDivElement;
            const currentItemIndex = Number(targetElement.id.split('_')[1]);

            cardElements.current.forEach((el) => {
              if (el === targetElement) {
                removeClassList(el);
                if (clickedCard !== currentItemIndex) {
                  setClickedCard(currentItemIndex);
                }
              } else {
                addClassList(el);
              }
            });
          }
        });
      },
      { root: cardsRef.current, threshold: 0.5 }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (!currentArticle) return <div>Loading...</div>;

  return (
    <>
      <div ref={ref} className='w-full flex justify-center items-center flex-col'>
        <div className='w-[90%] flex justify-center items-center flex-col'>
          {/* header */}
          <div className='w-full h-auto flex justify-center items-center flex-col gap-y-4 font-bold mt-12'>
            <img 
              src={currentArticle.thumbnail} 
              alt="project thumbnail" 
              className='h-auto w-[70%] rounded-[var(--border-radius-5)] shadow-lg' 
              onClick={throwConfettis}
            />
            <div className='w-full h-auto flex justify-center items-center flex-col gap-y-2'>
              <p className='text-lg'>{currentArticle.title}</p>
              <div className='w-full flex justify-center items-center gap-x-1'>
                <img src={currentArticle.thumbnail} alt="project thumbnail" className='h-auto w-[20px]' />
                <p className='text-sm'>~{currentArticle.readingTime}</p>
              </div>
            </div>
          </div>

          {/* separator */}
          <span className='w-[70%] h-[2px] bg-black rounded-full mt-12'></span>

          {/* content */}
          <div className='w-full h-auto flex justify-center items-center flex-col mt-12'>
            <p className='text-justify'>{currentArticle.description}</p>
          </div>

          {/* card container */}
          <div className='w-full h-auto flex justify-between items-center font-bold mt-12'>
            <p>{currentArticle.cards.length} ideas</p>
            <p>{currentArticle.reads_count}k lectures</p>
          </div>
          <div
            className='w-[100vw] h-[100vh] flex justify-center items-center flex-wrap snap-y snap-mandatory overflow-y-hidden scrollbars-hidden mt-4 px-4'
            ref={cardsRef}
          >
            {currentArticle.cards.map((card, i) => (
              <Card
                id={`card_${i}`}
                project={currentArticle}
                variant={card.type}
                cardToDisplay={i}
                classNames={[i !== currentArticle.cards.length -1 ? 'snap-center' : 'snap-end  mb-36', 'transition-all', 'duration-300']}
                key={i}
                ref={(el) => (cardElements.current[i] = el)}
                onClick={() => handleCardClick(i)}
                cardFocused={clickedCard === i}
                userHasRead={(a) => console.log('userHasRead', a)}
              />
            ))}
          </div>
        </div>
      </div>
      <BottomNav article={currentArticle} currentCard={clickedCard || 0} />
    </>
  );
};

export default Article;
