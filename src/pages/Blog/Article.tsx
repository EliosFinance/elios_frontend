import { useParams } from 'react-router-dom';
import { subjects, subjectType } from './temp/data';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Card from './Card';

const Article = () => {
  const [currentArticle, setCurrentArticle] = useState<subjectType | null>(null);
  const { id } = useParams<{ id: string }>();
  const ref = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setCurrentArticle(subjects.find((subject) => subject.id === Number(id)));
  }, [id]);

  useEffect(() => {
    if (!currentArticle || !cardsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Quand la section des cartes atteint le haut de la page
          cardsRef.current?.classList.add('overflow-y-auto');
          cardsRef.current?.classList.remove('overflow-y-hidden');
        } else {
          // Quand la section des cartes quitte le haut de la page
          cardsRef.current?.classList.add('overflow-y-hidden');
          cardsRef.current?.classList.remove('overflow-y-auto');
        }
      },
      { root: null, threshold: 0, rootMargin: '0px 0px -100% 0px' }
    );

    observer.observe(cardsRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentArticle]);

  if (!currentArticle) return <div>Loading...</div>;

  return (
    <div ref={ref} className='w-full flex justify-center items-center flex-col'>
      <div className='w-[90%] flex justify-center items-center flex-col'>
        {/* header */}
        <div className='w-full h-auto flex justify-center items-center flex-col gap-y-4 font-bold mt-12'>
          <img src={currentArticle.thumbnail} alt="project thumbnail" className='h-auto w-[70%] rounded-[var(--border-radius-5)] shadow-lg' />
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
          className='w-[100vw] h-[100vh] flex justify-center items-center flex-wrap gap-y-4 snap-y snap-mandatory overflow-y-hidden scrollbars-hidden mt-4'
          ref={cardsRef}
        >
          {currentArticle.cards.map((card, i) => (
            <Card 
              project={currentArticle} 
              variant={card.type} 
              key={i}
              cardToDisplay={i}
              classNames={['snap-center']}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Article;
