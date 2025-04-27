import { useGetConnections } from '@/api';
import AccountsSummary from '@/components/balance/AccountsSummary';
import BudgetOverview from '@/components/balance/BudgetOverview';
import ChallengesSection from '@/components/balance/ChallengesSection';
import GraphiqueTimeframe from '@/components/balance/GraphiqueTimeframe';
import IAAdvice from '@/components/balance/IAAdvice';
import SubscriptionsSection from '@/components/balance/SubscriptionsSection';
import TransactionsSection from '@/components/balance/TransactionsSection';
import PageLayout from '@/layout/PageLayout';
import { ConnectionType } from '@/types/connectionType';
import React, { useEffect, useState } from 'react';

const CentralExpensesPage: React.FC = () => {
    const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('month');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const { data: connections, error, isLoading } = useGetConnections();
    const [total, setTotal] = useState<number>(0);

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
            <GraphiqueTimeframe
                total={total}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                onDateSelected={setSelectedDate}
            />
            {/* <AccountsSummary date={selectedDate} /> */}
            {/* <IAAdvice /> */}
            {/* <SubscriptionsSection /> */}
            <BudgetOverview />
            <TransactionsSection />
            <ChallengesSection />
        </PageLayout>
    );
};

export default CentralExpensesPage;
