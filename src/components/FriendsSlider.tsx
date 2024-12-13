<<<<<<< HEAD
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ButtonApp from '@/components/ButtonApp';
import { userType } from "@/types/challengeType";
import { createUseStyles } from 'react-jss';
import { Link, useNavigate } from "react-router-dom";

=======
import ButtonApp from '@/components/ButtonApp';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { userType } from '@/types/challengeType';
import { createUseStyles } from 'react-jss';
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> 8309adc5df2153ddc52c205b27d70f0df717dc2a

type UsersListProps = {
    users: userType[];
};

const FriendsSlider = (props: UsersListProps) => {
    const styles = useStyles();
    const navigate = useNavigate();
    return (
        <div className={styles.wrapper}>
            <div className={styles.headingContent}>
                <h6 className={styles.heading}>Mes amis</h6>
<<<<<<< HEAD
                    <div>
                        <ButtonApp onClick={() => navigate('/friends')} color='primary' size='medium' sx={"!px-7 !py-2 !bg-customBlue"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                                <path d="M8 1L13 6M13 6L8 11M13 6L1 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </ButtonApp>
                    </div>
            </div>
            <Carousel>
                <CarouselContent className="ml-0">
                    {props.users.map((user) => (
                        <CarouselItem key={user.id} className="basis-1/2 pl-0 pr-5">
                            <Link to={`/friends/${user.id}`} className={styles.cardLink}>
                                <div
                                className={styles.card}
                                style={{ backgroundImage: `url(${user.profilePicture})` }}
                                >
                                <div className={styles.cardContent}>
                                    <p className={styles.name}>{user.username}</p>
                                    <p className={styles.score}>{user.score} ec</p>
                                </div>
=======
                <div>
                    <ButtonApp
                        onClick={() => navigate('/friends')}
                        color='primary'
                        size='medium'
                        sx={'!px-7 !py-2 !bg-customBlue'}
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' width='14' height='12' viewBox='0 0 14 12' fill='none'>
                            <path
                                d='M8 1L13 6M13 6L8 11M13 6L1 6'
                                stroke='black'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                    </ButtonApp>
                </div>
            </div>
            <Carousel>
                <CarouselContent className='ml-0'>
                    {props.users.map((user) => (
                        <CarouselItem key={user.id} className='basis-1/2 pl-0 pr-5'>
                            <Link to={`/friends/${user.id}`} className={styles.cardLink}>
                                <div className={styles.card} style={{ backgroundImage: `url(${user.profilePicture})` }}>
                                    <div className={styles.cardContent}>
                                        <p className={styles.name}>{user.username}</p>
                                        <p className={styles.score}>{user.score} ec</p>
                                    </div>
>>>>>>> 8309adc5df2153ddc52c205b27d70f0df717dc2a
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
<<<<<<< HEAD
                 </CarouselContent>
=======
                </CarouselContent>
>>>>>>> 8309adc5df2153ddc52c205b27d70f0df717dc2a
            </Carousel>
        </div>
    );
};

export default FriendsSlider;

const useStyles = createUseStyles({
    wrapper: {
        width: '100%',
        height: '100%',
    },
    headingContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
    },
    heading: {
        fontSize: '17px',
        fontWeight: '700',
    },
    cardLink: {
<<<<<<< HEAD
        display: "block", 
        textDecoration: "none", 
=======
        display: 'block',
        textDecoration: 'none',
>>>>>>> 8309adc5df2153ddc52c205b27d70f0df717dc2a
    },
    card: {
        height: '250px',
        borderRadius: '15px',
        position: 'relative',
        border: '1px solid #d1d1d1',
<<<<<<< HEAD
        backgroundSize: "cover",
        backgroundPosition: "center",
=======
        backgroundSize: 'cover',
        backgroundPosition: 'center',
>>>>>>> 8309adc5df2153ddc52c205b27d70f0df717dc2a
        '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
<<<<<<< HEAD
            bottom:0,
            width: '100%',
            height: '50%',
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%)',
=======
            bottom: 0,
            width: '100%',
            height: '50%',
            background:
                'linear-gradient(0deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%)',
>>>>>>> 8309adc5df2153ddc52c205b27d70f0df717dc2a
            borderRadius: '15px',
        },
    },
    cardContent: {
        position: 'absolute',
        bottom: '20px',
        left: '12px',
    },
    name: {
        fontSize: '16px',
    },
    score: {
        fontSize: '11px',
        color: '#626262',
        textTransform: 'uppercase',
    },
});
