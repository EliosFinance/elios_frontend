import mainLogo from '@/assets/images/corp/main_logo.png';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import arrow_back from '../../../../assets/images/icons/arrow_back.png';

type RegisterHeaderProps = {
    title?: string;
};

const RegisterHeader = ({ title }: RegisterHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className='relative w-full h-[20%] flex items-center justify-center'>
            <Button
                className='absolute top-[33%] left-0 font-bold text-2xl text-gray-800 bg-transparent'
                onClick={() => navigate(-1)}
            >
                <img src={arrow_back} alt='Back' className='w-6 h-auto mr-2' />
            </Button>

            <div className={`flex flex-col items-center justify-center ${title ? 'mt-12' : 'mt-6'}`}>
                <img src={mainLogo} alt='Elios Logo' className='mb-4 w-14 h-14 rounded-4' />
                <h1 className='text-3xl font-bold text-gray-800 mb-4 w-[20ch] text-center'>{title || ''}</h1>
            </div>
        </div>
    );
};

export default RegisterHeader;
