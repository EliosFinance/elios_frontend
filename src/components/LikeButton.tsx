import heartIcon from '@/assets/images/icons/heart_icon.png';
import { useRef } from 'react';
import { createUseStyles } from 'react-jss';

type LikeButtonProps = {
    liked: boolean;
    likes: number;
    isLiking: (isLiking: boolean) => void;
    disabled?: boolean;
    hideLikeAmount?: boolean;
};

const LikeButton = (props: LikeButtonProps) => {
    const styles = useStyles();
    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (!ref.current || props?.disabled) return;

        ref.current.classList.toggle(styles.liked);
        props.isLiking(ref.current.classList.contains(styles.liked));
    };

    return (
        <div
            className={[
                styles.like_button,
                props.disabled ? styles.disabled : '',
                props.hideLikeAmount ? styles.hideLikeAmount : '',
            ].join(' ')}
        >
            <div className={styles.heart_bg}>
                <div
                    className={[styles.heart_icon, props.liked ? styles.liked : ''].join(' ')}
                    ref={ref}
                    onClick={handleClick}
                />
                {!props?.disabled && !props?.hideLikeAmount && <div className={styles.like_amount}>{props.likes}</div>}
            </div>
        </div>
    );
};

export default LikeButton;

const useStyles = createUseStyles({
    '@keyframes likeAnim': {
        to: {
            backgroundPosition: 'right',
        },
    },
    like_button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '100px',
        height: '100%',
        marginLeft: '10%',
    },
    heart_bg: {
        background: 'rgba(255, 192, 200, 0)',
        borderRadius: '50%',
        height: '60px',
        width: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 100ms ease',
        transform: 'scale(0.8)',
    },
    heart_icon: {
        height: '100px',
        width: '100px',
        background: `url(${heartIcon})`,
        backgroundPosition: 'left',
        cursor: 'pointer',
        position: 'absolute',
        right: '50%',
    },
    liked: {
        animation: '$likeAnim 0.7s steps(28) forwards',
    },
    like_amount: {
        fontSize: '20px',
        fontFamily: '"Roboto", sans-serif',
        color: '#888',
        fontWeight: '900',
    },
    disabled: {
        pointerEvents: 'none',
        cursor: 'default',
        marginRight: '-60px',
        // opacity: '0.5',
    },
    hideLikeAmount: {
        marginRight: '-60px',
    },
});
