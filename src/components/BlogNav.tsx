import { likeArticle, saveArticle } from '@/api';
import { useAuth } from '@/context/AuthProvider';
import { ArticleType } from '@/types/BlogType';
import { useEffect, useState } from 'react';
import LikeButton from './LikeButton';
import SaveButton from './SaveButton';

type props = {
    currentCard?: number;
    article?: ArticleType;
    disableActionButtons?: boolean;
    backUrl?: string;
};

const BlogNav = (props: props) => {
    const { user } = useAuth();
    const [saved, setSaved] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(0);
    const handleSaveAction = async () => {
        if (props?.article?.id) {
            await saveArticle(props.article.id);
            setSaved(!saved);
        }
    };
    const handleLikeAction = async () => {
        if (props?.article?.id) {
            await likeArticle(props.article.id);
            setLikesCount(likesCount + 1);
        }
    };

    useEffect(() => {
        setSaved(props?.article?.saved.some((r) => r.username === user.username || r.email === user.username) || false);
        setLikesCount(props?.article?.likes.length || 0);
    }, []);

    return (
        <div className='w-full h-[60px] flex justify-between items-center flex-col bg-gray-200 shadow-sm fixed top-0 px-4 z-[10000000] rounded-b-[var(--border-radius-3)]'>
            {!props.disableActionButtons && (
                <div className='flex items-center w-full mt-2 justify-evenly gap-x-2'>
                    {props?.article?.articleContent?.map((_card, index) => (
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
            )}
            <div className='flex items-center justify-between w-full h-full gap-x-2'>
                <a href={props?.backUrl || '#'} onClick={() => !props?.backUrl && window.history.back()}>
                    ←
                </a>
                {!props.disableActionButtons && (
                    <>
                        <LikeButton
                            liked={
                                props?.article?.likes.some(
                                    (r) => r.username === user.username || r.email === user.username,
                                ) || false
                            }
                            likes={props?.article?.likes.length || 0}
                            isLiking={handleLikeAction}
                        />
                        <SaveButton saved={saved} isSaving={handleSaveAction} />
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogNav;
