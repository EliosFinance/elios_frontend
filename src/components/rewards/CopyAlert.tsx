// components/CopyAlert.tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CopyAlert = () => {
    return (
        <Alert mobile variant='default' className='mb-4'>
            <AlertTitle>Succès</AlertTitle>
            <AlertDescription>Le lien a été copié dans le presse-papiers !</AlertDescription>
        </Alert>
    );
};

export default CopyAlert;
