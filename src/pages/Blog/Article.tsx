import { useParams } from 'react-router-dom';
import { subjects, subjectType } from './temp/data';
import { useLayoutEffect, useState } from 'react';
import Card from './Card';

const Article = () => {
  const [currentArticle, setCurrentArticle] = useState<subjectType | null>(null);
  const { id } = useParams<{ id: string }>();

  useLayoutEffect(() => {
    setCurrentArticle(subjects.find((subject) => subject.id === Number(id)));
  }, [id]);
  
  if (!currentArticle) return <div>Loading...</div>;

  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <div className='w-[85%] flex justify-center items-center flex-col gap-y-12'>

        {/* body */}
        <div className='w-full h-full flex justify-center items-center flex-col gap-y-4 font-bold'>
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
        <span className='w-[70%] h-[2px] bg-black rounded-full'></span>

        {/* content */}
        <div className='w-full h-full flex justify-center items-center flex-col'>
          <p className='text-justify'>{currentArticle.description}</p>
        </div>

        {/* card container */}
        <div className='w-full h-full flex justify-center items-center flex-col'>
          <div className='w-full h-auto flex justify-between items-center font-bold'>
            <p>{currentArticle.cards.length} ideas</p>
            <p>{currentArticle.reads_count}k lectures</p>
          </div>
          <div className='w-full h-full flex justify-between items-center flex-wrap gap-y-4 gap-x-4'>
            {/* TODO: Vertical Carousel to animate cards ?? */}
            {
              currentArticle.cards.map((card, i) => (
                <Card 
                  project={currentArticle} 
                  variant={card.type} 
                  key={i}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article