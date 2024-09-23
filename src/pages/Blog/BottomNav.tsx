import { subjectType } from './temp/data'
import LikeButton from './LikeButton';
import SaveButton from './SaveButton';

type props = {
  currentCard?: number;
  article?: subjectType;
  disableActionButtons?: boolean;
  backUrl?: string;
}

const BottomNav = (props: props) => {


  return (
    <div className='w-full h-[50px] flex justify-between items-center flex-col bg-gray-200 shadow-sm fixed bottom-0 px-4'>
      {
        !props.disableActionButtons && (
          <div className='w-full flex justify-evenly items-center gap-x-2 mt-2'>
              {props.article.cards.map((_card, index) => (
                  <div
                  key={index}
                  className={`
                      h-[3px] transition-all duration-300 rounded-full
                      w-min-[2%]
                      ${props.currentCard === index ? 'w-[25%] bg-black' : 'w-[10%] bg-gray-600'}
                  `}
                  />
              ))}
          </div>
        )
      }
        <div className='w-full h-full flex justify-between items-center gap-x-2'>
            <a 
                href={props?.backUrl || '#'}
                onClick={() => !props?.backUrl && window.history.back()}
            >
              ←
            </a>
            {
                !props.disableActionButtons && (
                    <>
                        <LikeButton liked={props.article.likedByUser} likes={props.article.likes_count} isLiking={(a) => console.log(a)}  />
                        <SaveButton saved={props.article.savedByUser} isSaving={(a) => console.log(a)} />
                    </>
                )
            }
        </div>
    </div>
  );
}

export default BottomNav;
