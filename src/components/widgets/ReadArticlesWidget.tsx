import { getReadArticles, useGetBitcoin } from '@/api';
import humanizeNumbers from '@/helpers/humanizeNumbers';
import useLoggedUser from '@/hook/useLoggedUser';
import { ArticleType } from '@/types/BlogType';
import { userType } from '@/types/challengeType';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { data } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import WidgetSkeleton from './WidgetSkeleton';

const ReadArticlesWidget = () => {
    const [readArticles, setReadArticles] = useState<ArticleType[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const a = await getReadArticles();
            setReadArticles(a);
        };
        fetchArticles();
    }, []);

    return (
        <Card className='h-[200px] w-full flex flex-col justify-between rounded-xl bg-gray-800 text-white'>
            <CardHeader className='w-full flex flex-col items-start justify-between h-2/3'>
                <p>Articles lus</p>
                <p className='text-3xl font-black leading-5 !h-1/2'>
                    {Number(humanizeNumbers(readArticles.length))?.toFixed(0) || 'Error'}
                </p>
            </CardHeader>
            <CardContent className='flex flex-col justify-start h-1/3 pt-4'>
                <div className='w-full h-auto bg-green-500 rounded-xl px-3 py-1 flex items-center justify-center'>
                    <p className='w-full flex justify-center text-sm text-white leading-5'>Top 30%</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReadArticlesWidget;
