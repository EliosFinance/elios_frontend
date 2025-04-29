import { useGetConnections } from '@/api';
import BlurItem from '@/components/BlurItem';
import BudgetOverview from '@/components/balance/BudgetOverview';
import ChallengesSection from '@/components/balance/ChallengesSection';
import GraphiqueTimeframe from '@/components/balance/GraphiqueTimeframe';
import SubscriptionsSection from '@/components/balance/SubscriptionsSection';
import TransactionsSection from '@/components/balance/TransactionsSection';
import PageLayout from '@/layout/PageLayout';
import APP_ROUTES_ENUM from '@/types/APP_ROUTES_ENUM';
import { ConnectionType } from '@/types/connectionType';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CentralExpensesPage: React.FC = () => {
    const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('month');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const { data: connections } = useGetConnections();
    const [total, setTotal] = useState<number>(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (connections) {
            const sum = connections.reduce((acc: number, connection: ConnectionType) => {
                return acc + (connection.balance || 0);
            }, 0);
            setTotal(sum);
        }
    }, [connections, selectedDate]);

    return (
        <PageLayout title='Mes dépenses'>
            <BlurItem
                locked={!connections?.length}
                onClick={() => navigate(APP_ROUTES_ENUM.CONNECT_BANK_ACCOUNT)}
                variant='connectAccount'
                className='w-full min-h-[300px]'
            >
                <div className='flex items-center flex-col justify-between w-full gap-8'>
                    <GraphiqueTimeframe
                        total={total}
                        timeframe={timeframe}
                        onTimeframeChange={setTimeframe}
                        onDateSelected={setSelectedDate}
                    />
                    {/* <AccountsSummary date={selectedDate} /> */}
                    {/* <IAAdvice /> */}
                    <SubscriptionsSection />
                    <BudgetOverview />
                    <TransactionsSection />
                    <ChallengesSection />
                </div>
            </BlurItem>
        </PageLayout>
    );
};

export default CentralExpensesPage;
