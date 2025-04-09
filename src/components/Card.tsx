import { getSingleArticle, likeArticle, readArticle, saveArticle, saveArticleContent } from '@/api';
import { useAuth } from '@/context/AuthProvider';
import useConfettis from '@/hook/useConfettis';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ArticleContentType, ArticleType, ArticleTypesEnum, ContentTypesEnum } from '@/types/BlogType';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
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
    userHasRead: (contentId: number) => void;
};

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const { user } = useAuth();
    const [read, setRead] = useState<boolean>(
        props.article?.articleContent?.[props.cardToDisplay]?.reads?.some(
            (r) => r.username === user.username || r.email === user.username,
        ) || false,
    );
    const [saved, setSaved] = useState<boolean>(
        props.article?.articleContent?.[props.cardToDisplay]?.saved?.some(
            (r) => r.username === user.username || r.email === user.username,
        ) || false,
    );
    const [liked, setLiked] = useState<boolean>(
        props.article?.likes?.some((r: any) => r.username === user.username || r.email === user.username) || false,
    );
    const coolDownTime = props.article?.articleContent?.[props.cardToDisplay]?.contentType?.length * 1.5; // 1.5s per contentType
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
            timeoutRef.current = setTimeout(async () => {
                setRead(true);
                props.userHasRead(props.article?.articleContent?.[props.cardToDisplay].id);
            }, coolDownTime * 1000); // wait for the animation delay to be over
        }
    }, [
        coolDownTime,
        props,
        props.cardFocused,
        props.cardToDisplay,
        props.article.articleContent,
        read,
        styles.coolDown,
    ]);

    const handleSaveAction = async () => {
        if (!props?.article?.id) return;

        if (isPreviewVariant) {
            const res = await saveArticle(props.cardToDisplay);
            if (res) {
                setSaved(!saved);
            }
        } else {
            const res = await saveArticleContent(props.article.articleContent[props.cardToDisplay].id);
            if (res) {
                setSaved(!saved);
            }
        }
    };
    const handleLikeAction = async () => {
        if (!props?.article?.id || !isPreviewVariant) return;

        await likeArticle(props.cardToDisplay);
    };

    return (
        <>
            {isPreviewVariant && (
                <div
                    className={[
                        styles.card,
                        `${props.classNames && props.classNames.join(' ')}`,
                        styles[props.variant],
                    ].join(' ')}
                    id={props.id!}
                >
                    {/* header */}
                    <div className='w-full h-[7%] flex justify-between items-center mt-5 px-5'>
                        <div className='flex items-center justify-start w-auto h-full text-sm font-light text-center gap-x-2'>
                            {props.article?.reads?.some(
                                (r: any) => r.username === user.username || r.email === user.username,
                            ) ? (
                                <CheckCircleIcon className='h-[20px] text-green-500' />
                            ) : (
                                <XMarkIcon className='h-[20px] text-red-500' />
                            )}
                            <div>
                                <p>
                                    {props.article.articleContent?.length} ideas by{' '}
                                    <span className='font-bold'>
                                        {props.article.author?.firstName} {props.article.author?.lastName.split('')[0]}.
                                    </span>
                                </p>
                            </div>
                        </div>
                        <LikeButton liked={liked} isLiking={handleLikeAction} likes={0} hideLikeAmount />
                    </div>

                    {/* body */}
                    <a
                        className='flex flex-col items-center justify-center w-full h-full gap-y-4'
                        href={`${APP_ROUTES_ENUM.ARTICLE}/${props.article.id}`}
                    >
                        <img
                            src={props.article.thumbnail}
                            alt='project thumbnail'
                            className='h-[125px] w-[45%] rounded-[var(--border-radius-5)] shadow-lg object-cover'
                        />
                        <div className='flex flex-col items-center justify-center w-full h-auto gap-y-2'>
                            <p className='text-lg'>{props.article.title}</p>
                            <div className='flex items-center justify-center w-full gap-x-1'>
                                <img
                                    src={props.article.thumbnail}
                                    alt='project thumbnail'
                                    className='h-[20px] w-[20px] object-cover'
                                />
                                <p className='text-sm'>~ {props.article.readingTime}min</p>
                            </div>
                        </div>
                    </a>
                </div>
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
                                className='h-[120px] w-[120px] relative top-0 rounded-full object-cover object-center'
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
                    <div className='flex flex-col items-center justify-start w-full h-full px-8 mt-8 gap-y-4'>
                        <p className='w-full text-lg font-bold text-justify'>
                            {props.article.articleContent[props.cardToDisplay]?.title}
                        </p>
                        {props.article.articleContent[props.cardToDisplay].contentType.map((contentType, index) => (
                            <div key={index}>
                                {contentType.type === ContentTypesEnum.TEXT && (
                                    <p className='w-full text-sm text-justify'>{contentType.text}</p>
                                )}
                                {contentType.type === ContentTypesEnum.IMAGE && !Array.isArray(contentType.text) && (
                                    <img
                                        src={contentType.text}
                                        alt='project thumbnail'
                                        className='h-auto w-[40%] rounded-[var(--border-radius-8)] shadow-lg'
                                    />
                                )}
                                {contentType.type === ContentTypesEnum.VIDEO && !Array.isArray(contentType.text) && (
                                    <video
                                        src={contentType.text}
                                        className='h-auto w-[40%] rounded-[var(--border-radius-5)] shadow-lg'
                                    />
                                )}
                                {contentType.type === ContentTypesEnum.LIST && (
                                    <ul className='flex flex-col items-start justify-center w-full list-disc list-outside'>
                                        {Array.isArray(contentType.text) ? (
                                            contentType.text.map((item, itemIndex) => (
                                                <li key={itemIndex} className='ml-4 text-sm text-justify'>
                                                    {item}
                                                </li>
                                            ))
                                        ) : (
                                            <li className='text-sm'>{contentType.text}</li>
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
                            <CheckCircleIcon className='h-[20px] text-green-500' />
                        ) : (
                            <XMarkIcon className='h-[20px] text-red-500' />
                        )}
                        <SaveButton saved={saved} isSaving={handleSaveAction} />
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
            backgroundColor: '#cccccc53',
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
