import { get_powens_token } from '@/api';
import { Button } from '@/components/ui/button.tsx';
import { createUseStyles } from 'react-jss';

const BlurOverlay = () => {
    const styles = useStyles();
    return (
        <div className={styles.primaryDiv}>
            <Button onClick={get_powens_token}>Link your bank account</Button>
        </div>
    );
};

export default BlurOverlay;

const useStyles = createUseStyles({
    primaryDiv: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
});
