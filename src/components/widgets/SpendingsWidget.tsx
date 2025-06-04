import { useGetTransactions } from '@/api';
import humanizeNumbers from '@/helpers/humanizeNumbers';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import WidgetSkeleton from './WidgetSkeleton';

const DAYS = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];

const defaultChartData = DAYS.map((day) => ({
    day,
    spendings: 100,
    fill: '#d1d5dbac',
}));

const SpendingsWidget = () => {
    const { data: transactions, isLoading } = useGetTransactions();
    const [monthSpendings, setMonthSpendings] = useState('0');
    const [chartData, setChartData] = useState(defaultChartData);

    useEffect(() => {
        if (!transactions || transactions.length === 0) {
            setChartData(defaultChartData);
            setMonthSpendings('0');
            return;
        }

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const weekTransactions = transactions.filter((t) => {
            const date = new Date(t.last_update);
            return date >= startOfWeek && date <= endOfWeek;
        });

        const totalWeek = weekTransactions.reduce((sum, t) => sum + Number(t.value || 0), 0);

        const dailySpendings = Array(7).fill(0);

        for (const t of weekTransactions) {
            const date = new Date(t.last_update);
            const jsDay = date.getDay();
            const index = (jsDay + 6) % 7;
            dailySpendings[index] += Number(t.value || 0);
        }

        const data = DAYS.map((day, index) => {
            const spend = dailySpendings[index];
            const percent = totalWeek > 0 ? (spend / totalWeek) * 100 : 0;
            return {
                day,
                spendings: Number(percent.toFixed(2)),
                fill: '#dda853',
            };
        });

        const monthTransactions = transactions.filter((t) => {
            const d = new Date(t.last_update);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });

        const totalMonth = monthTransactions.reduce((sum, t) => sum + Number(t.value || 0), 0);

        setChartData(data);
        setMonthSpendings(humanizeNumbers(totalMonth));
    }, [transactions]);

    return (
        <div className='w-full h-full'>
            {isLoading ? (
                <WidgetSkeleton />
            ) : (
                <Card className='h-[200px] w-full flex flex-col items-center justify-between rounded-xl bg-gray-400 border border-white text-black'>
                    <CardTitle className='text-xs leading-5 font-semibold text-gray-600 pt-6'>
                        Vos dépenses ce mois-ci
                    </CardTitle>
                    <BarChart data={chartData} width={150} height={100} className=''>
                        <CartesianGrid vertical={false} strokeDasharray='3 3' />
                        <XAxis dataKey='day' tickLine={false} axisLine={false} tickMargin={5} className='!text-white' />
                        <Bar dataKey='spendings' fill='#dda853' radius={5} />
                    </BarChart>
                    <CardContent className='w-full flex flex-col items-start h-full pt-2'>
                        <p className='text-3xl font-black leading-5'>{monthSpendings} €</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default SpendingsWidget;
