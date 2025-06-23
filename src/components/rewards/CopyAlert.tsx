import { CheckCircleIcon } from 'lucide-react';

const CopyAlert = () => {
    return (
        <div className='flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm border border-green-400/30 rounded-xl shadow-lg'>
            <div className='flex items-center justify-center w-6 h-6 bg-white/20 rounded-full'>
                <CheckCircleIcon className='w-4 h-4 text-white' />
            </div>
            <div>
                <p className='text-sm font-medium text-white'>Lien copié !</p>
                <p className='text-xs text-green-100'>Le code de parrainage a été copié dans le presse-papiers</p>
            </div>
        </div>
    );
};

export default CopyAlert;
