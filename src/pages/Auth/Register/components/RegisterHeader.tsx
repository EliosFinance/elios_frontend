import mainLogo from '@/assets/images/corp/main_logo.png';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import arrow_back from '../../../../assets/images/icons/arrow_back.png';

type RegisterHeaderProps = {
    title?: string;
    disableGoBack?: boolean;
};

const RegisterHeader = ({ title, disableGoBack }: RegisterHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className='relative w-full h-[20%] flex items-baseline justify-center'>
            {!disableGoBack && (
                <Button
                    className='absolute top-[6%] left-0 font-bold text-2xl bg-transparent'
                    onClick={() => navigate(-1)}
                >
                    <img src={arrow_back} alt='Back' className='w-8 h-8' />
                </Button>
            )}

            <div className={`flex flex-col items-center justify-center gap-4`}>
                <img src={mainLogo} alt='Elios Logo' className='mb-4 w-12 h-12 rounded-4' />
                <h1 className='text-2xl font-bold mb-4 w-[95%] text-center'>{title || ''}</h1>
            </div>
        </div>
    );
};

export default RegisterHeader;
