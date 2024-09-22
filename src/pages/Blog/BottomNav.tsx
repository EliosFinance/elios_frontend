import { subjectType } from './temp/data'
import LikeButton from './LikeButton';

type props = {
  currentCard: number;
  article: subjectType;
}

const BottomNav = ({ currentCard, article }: props) => {


  return (
    <div className='w-full h-[50px] flex justify-between items-center flex-col bg-gray-200 shadow-sm fixed bottom-0 px-4'>
        <div className='w-full flex justify-evenly items-center gap-x-2 mt-2'>
            {article.cards.map((_card, index) => (
                <div
                key={index}
                className={`
                    h-[3px] transition-all duration-300 rounded-full
                    w-min-[2%]
                    ${currentCard === index ? 'w-[25%] bg-black' : 'w-[10%] bg-gray-600'}
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
            <LikeButton liked={false} likes={article.likes_count} isLiking={(a) => console.log(a)}  />
              
            {/* TODO: save button */}
            <button>save</button>
        </div>
    </div>
  );
}

export default BottomNav;
