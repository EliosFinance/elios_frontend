import useConfettis from '@/hook/useConfettis';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { challengeType } from '@/types/challengeType';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type FinishedChallengeAnimationProps = {
    challenge: challengeType;
};

const FinishedChallengeAnimation = (props: FinishedChallengeAnimationProps) => {
    const { throwPartyConfettis } = useConfettis();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        throwPartyConfettis();
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: '-100vh' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100vh' }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    className='absolute top-0 left-0 w-full z-[10000000000000000000000] rounded-2xl bg-white border-gray-200 border-2'
                >
                    <div className='w-full h-20 rounded-2xl p-4 flex items-center justify-center'>
                        <Link
                            className='flex items-center justify-between relative'
                            to={`${APP_ROUTES_ENUM.CHALLENGE}/${props.challenge?.id}`}
                        >
                            <div className='w-18 h-18 rounded-full bg-blue-500 flex items-center justify-center'>
                                <CheckCircleIcon className='w-12 h-12 text-white' />
                            </div>
                            <div className='ml-4'>
                                <h3 className='text-lg font-bold'>Bravo !</h3>
                                <p className='text-sm'>Vous avez terminé "{props.challenge?.title}"</p>
                            </div>
                        </Link>
                        <XMarkIcon className='w-6 h-6 absolute top-2 right-2 cursor-pointer' onClick={handleClose} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FinishedChallengeAnimation;
