// components/Header.tsx
import { ArrowLeftIcon, EyeIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
    title: string;
    onBack: () => void;
}

const Header = ({ title, onBack }: HeaderProps) => {
    return (
        <header className='relative flex items-center justify-center w-full h-20 px-6 bg-gray-200'>
            <div className='absolute z-10 flex items-center top-4 left-4'>
                <ArrowLeftIcon className='w-8 h-8 cursor-pointer' onClick={onBack} />
            </div>
            <h2 className='z-10 text-xl font-bold'>{title}</h2>
            <div className='absolute z-10 flex items-center top-4 right-4'>
                <EyeIcon className='w-8 h-8 cursor-pointer' />
            </div>
        </header>
    );
};

export default Header;
