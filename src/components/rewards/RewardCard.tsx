import { Button } from '../ui/button';

interface RewardCardProps {
    title: string;
    progress: number;
    imageUrl: string;
}

const RewardCard = ({ title, progress, imageUrl }: RewardCardProps) => {
    return (
        <div className='flex items-center justify-between p-4 mb-4 border bg-[--neutral-800] border-gray-500 rounded-lg'>
            <img src={imageUrl} alt='Reward' className='w-10 h-10 mr-4' />
            <div className='flex-1'>
                <p>{title}</p>
                <div className='h-2 mt-2 bg-blue-200 rounded-full'>
                    <div className='h-2 bg-blue-500 rounded-full' style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <Button className='px-3 py-1 ml-4 text-white bg-blue-500 rounded active:bg-blue-500 focus:bg-blue-500'>Récupérer</Button>
        </div>
    );
};

export default RewardCard;
