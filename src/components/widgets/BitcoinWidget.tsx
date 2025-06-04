import { useGetBitcoin } from '@/api';
import humanizeNumbers from '@/helpers/humanizeNumbers';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import WidgetSkeleton from './WidgetSkeleton';

const BitcoinWidget = () => {
    const [price, setPrice] = useState<string>('');
    const [last24hrChange, setLast24hrChange] = useState<number>(0);
    const { data, isLoading } = useGetBitcoin();

    useEffect(() => {
        if (data) {
            const currentBtcPrice = data?.market_data?.current_price?.eur;
            const last24hrChange = data?.market_data?.price_change_24h;
            if (!currentBtcPrice) return;

            const displayPrice = humanizeNumbers(currentBtcPrice);

            const changePercentage = (last24hrChange / currentBtcPrice) * 100;
            setLast24hrChange(changePercentage);
            setPrice(displayPrice);
        }
    }, [data]);

    return (
        <div className='!w-min-full !w-full h-full'>
            {isLoading ? (
                <WidgetSkeleton />
            ) : (
                <Card className='h-[200px] !w-min-fullw-full flex flex-col justify-between rounded-xl bg-gray-700 border border-gray-300 text-white'>
                    <CardHeader className='!w-min-full !w-full flex flex-row items-start justify-between h-full'>
                        <div className='w-8 h-8 bg-gray-800 flex items-center justify-center rounded-full'>
                            {last24hrChange > 0 ? (
                                <ArrowUp className='w-6 h-6 text-green-500' />
                            ) : (
                                <ArrowDown className='w-6 h-6 text-red-500' />
                            )}
                        </div>
                        <span className={last24hrChange > 0 ? 'text-green-500' : 'text-red-500'}>
                            {last24hrChange > 0 ? '+' : ''} {last24hrChange.toFixed(2)}%
                        </span>
                    </CardHeader>
                    <CardContent className='flex flex-col items-start h-full'>
                        <p className='text-3xl font-black leading-5 !h-1/2'>{price}</p>
                        <CardTitle className='text-sm leading-5 font-semibold text-gray-400 !h-1/2'>
                            Bitcoin price
                        </CardTitle>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default BitcoinWidget;
