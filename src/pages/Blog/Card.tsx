import { createUseStyles } from 'react-jss';
import { cardType, cardTypesEnum, contentTypesEnum, subjectType } from './temp/data';
import icon from '@/assets/images/icons/google_icon.png';
import icon2 from '@/assets/images/icons/twitter_icon.png';
import { APP_ROUTES_ENUM } from '@/main';
import { forwardRef } from 'react';

type CardProps = {
    project: cardTypesEnum.SMALL_PREVIEW | cardTypesEnum.PREVIEW extends cardTypesEnum ? subjectType : cardType;
    variant: cardTypesEnum;
    classNames?: string[];
    cardToDisplay?: number;
    id?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const styles = useStyles(); 
    const isPreviewVariant = props.variant === cardTypesEnum.SMALL_PREVIEW || props.variant === cardTypesEnum.PREVIEW;

    return (
        <>
            {
                isPreviewVariant && (
                    <a 
                        href={`${APP_ROUTES_ENUM.ARTICLE}/${props.project.id}`}
                        className={
                            [
                                `${props.classNames && props.classNames.join(' ')}`, 
                                styles[props.variant],
                            ].join(' ')
                        }
                        id={props.id!}
                    >
                        {/* header */}
                        <div className='w-full h-[7%] flex justify-between items-center mt-5 px-5'>
                            <div className='w-auto h-full flex justify-start items-center text-sm font-light gap-x-2 text-center'>
                                <img src={props.project.readByUser ? icon2 : icon} alt="cardHeaderIcon" className='h-[20px] w-auto'/>
                                <div>
                                    <p>
                                        {props.project.cards.length} ideas by <span className='font-bold'>{props.project.author.firstName} {props.project.author.lastName.split('')[0]}.</span>
                                    </p>
                                </div>
                            </div>
                            <img src={props.project.likedByUser ? icon : icon2} alt="cardHeaderIcon" className='h-[20px]'/>

                        </div>

                        {/* body */}
                        <div className='w-full h-full flex justify-center items-center flex-col gap-y-4'>
                            <img src={props.project.thumbnail} alt="project thumbnail" className='h-auto w-[40%] rounded-[var(--border-radius-5)] shadow-lg' />
                            <div className='w-full h-auto flex justify-center items-center flex-col gap-y-2'>
                                <p className='text-lg'>{props.project.title}</p>
                                <div className='w-full flex justify-center items-center gap-x-1'>
                                    <img src={props.project.thumbnail} alt="project thumbnail" className='h-auto w-[20px]' />
                                    <p className='text-sm'>~{props.project.readingTime}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                )   
            }
            {
                !isPreviewVariant && (
                    <div
                        className={
                            [
                                `${props.classNames && props.classNames.join(' ')}`, 
                                styles[props.variant],
                            ].join(' ')
                        }
                        ref={ref}
                        id={props.id!}
                        onClick={props.onClick}
                    >
                        {/* header */}
                        {
                            props.variant === cardTypesEnum.FULL_ROUNDED_IMAGE ? (
                                <div className='w-full h-[150px] flex justify-center items-center mt-8'>
                                    <img src={props.project.thumbnail} alt="cardHeaderIcon" className='h-[80%] w-auto relative top-0 rounded-full object-cover object-center'/>
                                </div>
                            ) : (
                                <img src={props.project.thumbnail} alt="cardHeaderIcon" className='h-[150px] w-full relative top-0 rounded-t-[var(--border-radius-8)] object-cover object-center'/>
                            )
                        }

                        {/* body */}
                        <div className='w-full h-full flex justify-start items-center flex-col gap-y-4 px-8 mt-8'>
                        <p className='w-full text-lg text-justify font-bold'>{props.project.cards[props.cardToDisplay]?.title}</p>
                          {
                            props.project.cards[props.cardToDisplay].content.map((content, index) => (
                              <div key={index}>
                                {content.type === contentTypesEnum.TEXT && (
                                  <p className='w-full text-sm text-justify'>{content.text}</p>
                                )}
                                {content.type === contentTypesEnum.IMAGE && !Array.isArray(content.text) && (
                                  <img src={content.text} alt="project thumbnail" className='h-auto w-[40%] rounded-[var(--border-radius-8)] shadow-lg' />
                                )}
                                {content.type === contentTypesEnum.VIDEO && !Array.isArray(content.text) && (
                                  <video src={content.text} className='h-auto w-[40%] rounded-[var(--border-radius-5)] shadow-lg' />
                                )}
                                {content.type === contentTypesEnum.LIST && (
                                  <ul className='w-full flex justify-center items-start flex-col list-disc list-outside'>
                                    {
                                      Array.isArray(content.text) ? 
                                      content.text.map((item, itemIndex) => (
                                        <li key={itemIndex} className='text-sm text-justify ml-4'>{item}</li>
                                      )) : <li className='text-sm'>{content.text}</li>
                                    }
                                  </ul>
                                )}
                                {content.type === contentTypesEnum.QUOTE && (
                                    <>
                                        <blockquote className='w-full text-sm text-justify'>{content.text}</blockquote>
                                        {content?.quoteAuthor && <p className='w-full text-sm text-justify'>{content.quoteAuthor.firstName} {content.quoteAuthor.lastName}</p>}                                       
                                    </>
                                )}
                              </div>
                            ))
                          }
                        </div>

                        {/* footer */}
                        <div className='w-full h-[7%] flex justify-between items-center px-8 my-8'>
                            {/* TODO: read cooldown */}
                            <img src={props.project.cards[props.cardToDisplay].readByUser ? icon2 : icon} alt="cardFooterIcon" className='h-[25px]'/>
                            {/* TODO: save button */}
                            <img src={props.project.cards[props.cardToDisplay].savedByUser ? icon : icon2} alt="cardFooterIcon" className='h-[25px]'/>
                        </div>
                    </div>
                )
            }
        </>
    )
})

export default Card

const useStyles = createUseStyles({
    small_preview: {
        backgroundColor: '#e4e4e4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 'var(--border-radius-8)',
        boxShadow: 'var(--elevation-4)',
        padding: '5px',
        height: '75dvw',
        width: '75dvw',
    },
    preview: {
        backgroundColor: '#e4e4e4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 'var(--border-radius-8)',
        boxShadow: 'var(--elevation-4)',
        padding: '5px',
        height: '75dvw',
        width: '75dvw',
    },
    full: {
        // backgroundColor: '#e4e4e4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 'var(--border-radius-8)',
        boxShadow: 'var(--elevation-4)',
        minHeight: '60vh',
        maxHeight: '90vh',
        height: 'auto !important',
        width: '100%',
    },
    full_rounded_image: {
        backgroundColor: '#e4e4e4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 'var(--border-radius-8)',
        boxShadow: 'var(--elevation-4)',
        height: 'auto !important',
        width: '100%',
    },
})