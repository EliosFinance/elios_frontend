import { likeArticle, saveArticle, saveArticleContent } from '@/api';
import icon from '@/assets/images/icons/google_icon.png';
import icon2 from '@/assets/images/icons/twitter_icon.png';
import { APP_ROUTES_ENUM } from '@/main';
import { forwardRef, useEffect, useRef, useState } from 'react';
/* eslint-disable react-refresh/only-export-components */
import { createUseStyles } from 'react-jss';
import { ArticleContentType, ArticleType, ArticleTypesEnum, ContentTypesEnum } from '../types/BlogType';
import LikeButton from './LikeButton';
import SaveButton from './SaveButton';

type CardProps = {
    article: ArticleTypesEnum.SMALL_PREVIEW | ArticleTypesEnum.PREVIEW extends ArticleTypesEnum
        ? ArticleType
        : ArticleContentType;
    variant: ArticleTypesEnum;
    cardToDisplay: number;
    classNames?: string[];
    cardFocused?: boolean;
    id?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    userHasRead: (userHasRead: boolean) => void;
};

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const [read, setRead] = useState<boolean>(props.article?.cards?.[props.cardToDisplay]?.readByUser || false);
    const coolDownTime = props.article?.cards?.[props.cardToDisplay]?.content.length * 1.5; // 1.5s per content
    const styles = useCardStyles(coolDownTime);
    const isPreviewVariant =
        props.variant === ArticleTypesEnum.SMALL_PREVIEW || props.variant === ArticleTypesEnum.PREVIEW;
    const coolDownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!props.cardFocused || !coolDownRef.current || !coolDownRef.current.classList) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            return;
        } else if (props.cardFocused && read) {
            coolDownRef.current?.classList.remove(styles.coolDown);
            return;
        } else {
            timeoutRef.current = setTimeout(() => {
                setRead(true);
                props.userHasRead(true);
            }, coolDownTime * 1000); // wait for the animation delay to be over
        }
    }, [coolDownTime, props, props.cardFocused, props.cardToDisplay, props.article.cards, read, styles.coolDown]);

    const handleSaveAction = async () => {
        if (!props?.article?.id) return;

        if (isPreviewVariant) {
            await saveArticle(props.cardToDisplay);
        } else {
            await saveArticleContent(props.cardToDisplay);
        }
    };
    const handleLikeAction = async () => {
        if (!props?.article?.id || !isPreviewVariant) return;

        await likeArticle(props.cardToDisplay);
    };

    return (
        <>
            {isPreviewVariant && (
                <a
                    href={`${APP_ROUTES_ENUM.ARTICLE}/${props.article.id}`}
                    className={[
                        styles.card,
                        `${props.classNames && props.classNames.join(' ')}`,
                        styles[props.variant],
                    ].join(' ')}
                    id={props.id!}
                >
                    {/* header */}
                    <div className='w-full h-[7%] flex justify-between items-center mt-5 px-5'>
                        <div className='w-auto h-full flex justify-start items-center text-sm font-light gap-x-2 text-center'>
                            <img
                                src={props.article.readByUser ? icon2 : icon}
                                alt='cardHeaderIcon'
                                className='h-[20px] w-auto'
                            />
                            <div>
                                <p>
                                    {props.article.cards.length} ideas by{' '}
                                    <span className='font-bold'>
                                        {props.article.author.firstName} {props.article.author.lastName.split('')[0]}.
                                    </span>
                                </p>
                            </div>
                        </div>
                        <LikeButton liked={props.article.likedByUser} isLiking={handleLikeAction} likes={0} disabled />
                    </div>

                    {/* body */}
                    <div className='w-full h-full flex justify-center items-center flex-col gap-y-4'>
                        <img
                            src={props.article.thumbnail}
                            alt='project thumbnail'
                            className='h-auto w-[40%] rounded-[var(--border-radius-5)] shadow-lg'
                        />
                        <div className='w-full h-auto flex justify-center items-center flex-col gap-y-2'>
                            <p className='text-lg'>{props.article.title}</p>
                            <div className='w-full flex justify-center items-center gap-x-1'>
                                <img
                                    src={props.article.thumbnail}
                                    alt='project thumbnail'
                                    className='h-auto w-[20px]'
                                />
                                <p className='text-sm'>~{props.article.readingTime}</p>
                            </div>
                        </div>
                    </div>
                </a>
            )}
            {!isPreviewVariant && (
                <div
                    className={[
                        styles.card,
                        `${props.classNames && props.classNames.join(' ')}`,
                        styles[props.variant],
                    ].join(' ')}
                    ref={ref}
                    id={props.id!}
                    onClick={props.onClick}
                >
                    {/* header */}
                    {props.variant === ArticleTypesEnum.FULL_ROUNDED_IMAGE ? (
                        <div className='w-full h-[150px] flex justify-center items-center mt-8'>
                            <img
                                src={props.article.thumbnail}
                                alt='cardHeaderIcon'
                                className='h-[80%] w-auto relative top-0 rounded-full object-cover object-center'
                            />
                        </div>
                    ) : (
                        <img
                            src={props.article.thumbnail}
                            alt='cardHeaderIcon'
                            className='h-[150px] w-full relative top-0 rounded-t-[var(--border-radius-8)] object-cover object-center'
                        />
                    )}

                    {/* body */}
                    <div className='w-full h-full flex justify-start items-center flex-col gap-y-4 px-8 mt-8'>
                        <p className='w-full text-lg text-justify font-bold'>
                            {props.article.cards[props.cardToDisplay]?.title}
                        </p>
                        {props.article.cards[props.cardToDisplay].content.map((content, index) => (
                            <div key={index}>
                                {content.type === ContentTypesEnum.TEXT && (
                                    <p className='w-full text-sm text-justify'>{content.text}</p>
                                )}
                                {content.type === ContentTypesEnum.IMAGE && !Array.isArray(content.text) && (
                                    <img
                                        src={content.text}
                                        alt='project thumbnail'
                                        className='h-auto w-[40%] rounded-[var(--border-radius-8)] shadow-lg'
                                    />
                                )}
                                {content.type === ContentTypesEnum.VIDEO && !Array.isArray(content.text) && (
                                    <video
                                        src={content.text}
                                        className='h-auto w-[40%] rounded-[var(--border-radius-5)] shadow-lg'
                                    />
                                )}
                                {content.type === ContentTypesEnum.LIST && (
                                    <ul className='w-full flex justify-center items-start flex-col list-disc list-outside'>
                                        {Array.isArray(content.text) ? (
                                            content.text.map((item, itemIndex) => (
                                                <li key={itemIndex} className='text-sm text-justify ml-4'>
                                                    {item}
                                                </li>
                                            ))
                                        ) : (
                                            <li className='text-sm'>{content.text}</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* cool down */}
                    {props?.cardFocused && <div className={styles.coolDown} ref={coolDownRef}></div>}
                    {/* footer */}
                    <div className='w-full h-[7%] flex justify-between items-center px-8 my-8'>
                        {read ? (
                            <img src={icon} alt='cardHeaderIcon' className='h-[20px]' />
                        ) : (
                            <img src={icon2} alt='cardHeaderIcon' className='h-[20px]' />
                        )}
                        <SaveButton
                            saved={props.article.cards[props.cardToDisplay].savedByUser}
                            isSaving={handleSaveAction}
                        />
                    </div>
                </div>
            )}
        </>
    );
});

export const useCardStyles = (coolDownTime: number) =>
    createUseStyles({
        '@keyframes readCoolDownAnim': {
            to: {
                height: '0px',
            },
            '100%': {
                backgroundColor: 'transparent',
            },
        },
        coolDown: {
            width: '100%',
            height: '100%',
            backgroundColor: '#ff000054',
            borderBottomLeftRadius: 'var(--border-radius-8)',
            borderBottomRightRadius: 'var(--border-radius-8)',
            position: 'absolute',
            bottom: 0,
            zIndex: 1,
            animation: `$readCoolDownAnim ${coolDownTime}s`,
            transition: 'all 0.5s ease',
            transitionDelay: '0.5s',
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 'var(--border-radius-8)',
            boxShadow: 'var(--elevation-4)',
            position: 'relative',
            backgroundColor: '#eeeeee',
        },
        small_preview: {
            // backgroundColor: '#e4e4e4',
            padding: '5px',
            height: '75dvw',
            width: '75dvw',
        },
        preview: {
            // backgroundColor: '#e4e4e4',
            padding: '5px',
            height: '75dvw',
            width: '75dvw',
        },
        full: {
            // backgroundColor: '#e4e4e4',
            minHeight: '60vh',
            maxHeight: '90vh',
            height: 'auto !important',
            width: '100%',
        },
        full_rounded_image: {
            // backgroundColor: '#e4e4e4',
            height: 'auto !important',
            width: '100%',
        },
    })();
