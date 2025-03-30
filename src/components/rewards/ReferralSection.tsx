// components/ReferralSection.tsx
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';

interface ReferralSectionProps {
    onCopy: () => void;
}

const ReferralSection = ({ onCopy }: ReferralSectionProps) => {
    return (
        <>
            <div className='flex items-center justify-between p-4 mb-4 bg-gray-100 rounded'>
                <Input type='text' value='elios.me/username-id' className='w-full p-2 mr-2 bg-white rounded' readOnly />
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        onCopy();
                    }}
                    className='px-2 py-1 text-sm bg-gray-300 rounded'
                >
                    Copy
                </Button>
            </div>
            <Button className='w-full py-2 mb-4 text-white bg-blue-500 rounded'>Partager</Button>
        </>
    );
};

export default ReferralSection;
