// components/EliCoinsCard.tsx
interface EliCoinsCardProps {
    coins: number;
    totalCoins: number;
}

const EliCoinsCard = ({ coins, totalCoins }: EliCoinsCardProps) => {
    const percentage = (coins / totalCoins) * 100;

    return (
        <div className='p-4 mb-4 bg-gray-100 rounded'>
            <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center'>
                    <img
                        src='https://images.unsplash.com/photo-1574607407517-cd664b1504f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29pbnN8ZW58MHx8MHx8fDA%3D'
                        alt='EliCoins'
                        className='w-16 h-16 mr-2'
                    />
                    <span className='font-bold'>Mes EliCoins</span>
                </div>
                <span className='font-bold'>
                    {coins}/{totalCoins}
                </span>
            </div>
            <div className='h-2 bg-blue-200 rounded-full'>
                <div className='h-2 bg-blue-500 rounded-full' style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

export default EliCoinsCard;
