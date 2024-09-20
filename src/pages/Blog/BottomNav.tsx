import { useEffect, useState } from 'react';
import { cardType } from './temp/data'

type props = {
  cards: cardType[];
  currentCard: number;
}

const BottomNav = ({ cards, currentCard }: props) => {
  const [localCurrentCard, setLocalCurrentCard] = useState<number>(currentCard);

  useEffect(() => {
    setLocalCurrentCard(currentCard);
  }, [currentCard]);

  return (
    <div className='w-full h-[50px] flex justify-between items-center flex-col bg-gray-200 shadow-sm fixed bottom-0 px-4'>
        <div className='w-full flex justify-evenly items-center gap-x-2 mt-2'>
            {cards.map((_card, index) => (
                <div
                key={index}
                className={`
                    h-[3px] transition-all duration-300 rounded-full
                    w-min-[2%]
                    ${localCurrentCard === index ? 'w-[25%] bg-black' : 'w-[10%] bg-gray-600'}
                `}
                />
            ))}
        </div>
        <div className='w-full h-[35px] flex justify-between items-center gap-x-2'>
            <a 
                href="#" 
                onClick={() => window.history.back()}>
                    ←
            </a>
            {/* TODO: like button */}
            <button>like</button>
            {/* TODO: save button */}
            <button>save</button>
        </div>
    </div>
  );
}

export default BottomNav;
