import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categories, categoryType, subjects, subjectType } from './temp/data';

const ArticleCategory = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<categoryType | null>(null);
  const [cards, setCards] = useState<subjectType[]>([]);

  useEffect(() => {
    setCategory(categories.find((category) => category.id === Number(id)));
    if (category) {
      setCards(subjects.filter((subject) => subject.category === category.title));
      console.log(cards, category);
      
    }
  }, [category, id]);

  return (
    <div className='w-full flex justify-center items-center flex-col'>
        <div className='w-[90%] flex justify-center items-center flex-col'>
          {id}
        </div>
    </div>
  )
}

export default ArticleCategory