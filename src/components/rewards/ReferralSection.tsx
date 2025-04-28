// components/ReferralSection.tsx
import { Input } from '@/components/ui/input';
import { BackspaceIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import ButtonApp from '../ButtonApp';

interface ReferralSectionProps {
    onCopy: () => void;
}

const ReferralSection = ({ onCopy }: ReferralSectionProps) => {
    const [coolDownOn, setCoolDownOn] = useState<boolean>(false);
    const styles = useStyles();

    useEffect(() => {
        const timer = setTimeout(() => {
            setCoolDownOn(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [coolDownOn]);

    const handleCopy = () => {
        navigator.clipboard
            .writeText('elios.me/username-id')
            .then(() => {
                setCoolDownOn(true);
                onCopy();
            })
            .catch((err) => console.error('Erreur de copie:', err));
    };

    return (
        <>
            <div className='flex items-center flex-col justify-between p-4 mb-4 bg-gray-100 rounded-lg'>
                <div className={styles.inputAppContainer} onClick={handleCopy}>
                    <input className={styles.input} type={'text'} value={'elios.me/username-id'} readOnly />
                    <span className={styles.endIcon}>
                        {coolDownOn ? (
                            <CheckIcon className='w-5 h-5 text-white cursor-pointer' />
                        ) : (
                            <CopyIcon className='w-5 h-5 text-white' />
                        )}
                    </span>
                </div>
                <ButtonApp
                    bold
                    onClick={() => alert('TODO: share with friends (see w/melissa)')}
                    sx='!rounded-xl bg-primary-500 text-white'
                >
                    Partager
                </ButtonApp>
            </div>
        </>
    );
};

export default ReferralSection;
const useStyles = createUseStyles({
    inputAppContainer: {
        position: 'relative',
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid var(--neutral-500)',
        backgroundColor: 'var(--neutral-800)',
        borderRadius: '5px',
        fontSize: '16px',
        margin: '10px 0',
        borderTopLeftRadius: 'var(--border-radius-3)',
        borderTopRightRadius: 'var(--border-radius-3)',
        borderBottomRightRadius: 'var(--border-radius-3)',
        borderBottomLeftRadius: 'var(--border-radius-3)',
        paddingLeft: '15px',
        outline: 'none',
    },
    endIcon: {
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
    },
});
