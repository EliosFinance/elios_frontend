import { Progress } from '@/components/ui/progress';
import { challengeType } from '@/types/challengeType';
import { createUseStyles } from 'react-jss';

type PartnerChallengeProps = {
    challenge: challengeType;
};

// Le nombre de progression est fixe pour le moment
// pareil pour le nombre total de défis réalisés

const PartnerChallenge = (props: PartnerChallengeProps) => {
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            <div className={styles.leftPart} style={{ backgroundImage: `url(${props.challenge.image})` }}>
                <div className={styles.categoryIcon}>
                    <img
                        className={styles.icon}
                        src={props.challenge.category.icon}
                        alt={props.challenge.category.title}
                    />
                </div>
            </div>
            <div className={styles.rightPart}>
                <h6 className={styles.challengeTitle}>{props.challenge.title}</h6>
                <p className={styles.challengeDesc}>{props.challenge.description}</p>
                <div className={styles.progressBar}>
                    <Progress value={66} />
                </div>
                <p className={styles.challengeProgression}>05/41</p>
            </div>
        </div>
    );
};

export default PartnerChallenge;

const useStyles = createUseStyles({
    wrapper: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        display: 'flex',
        gap: '12px',
        flexDirection: 'row',
        border: '1px solid #4361EE',
    },
    leftPart: {
        width: '30%',
        borderRadius: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    categoryIcon: {
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        backgroundColor: '#D9D9D9',
        margin: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: '12px',
        height: '12px',
    },
    rightPart: {
        width: '70%',
        paddingRight: '50px',
    },
    challengeTitle: {
        paddingTop: '20px',
        paddingBottom: '13px',
        fontSize: '14px',
        lineHeight: '1.2',
        fontWeight: '700',
    },
    challengeDesc: {
        fontSize: '9px',
        fontWeight: '400',
        color: '#535353',
        paddingBottom: '20px',
        lineHeight: '1.2',
    },
    progressBar: {
        paddingBottom: '18px',
    },
    challengeProgression: {
        fontWeight: '700',
        color: '#000000',
        fontSize: '10px',
        textAlign: 'right',
        paddingBottom: '14px',
    },
});
