import AccountsSummary from '@/components/balance/AccountsSummary';
import BudgetOverview from '@/components/balance/BudgetOverview';
import ChallengesSection from '@/components/balance/ChallengesSection';
import GraphiqueTimeframe from '@/components/balance/GraphiqueTimeframe';
import IAAdvice from '@/components/balance/IAAdvice';
import SubscriptionsSection from '@/components/balance/SubscriptionsSection';
import TransactionsSection from '@/components/balance/TransactionsSection';
import PageLayout from '@/layout/PageLayout';
import React, { useState } from 'react';

const CentralExpensesPage: React.FC = () => {
    const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('month');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <PageLayout title='Centralisation des dépenses'>
            <GraphiqueTimeframe
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                onDateSelected={setSelectedDate}
            />
            <AccountsSummary date={selectedDate} />
            {/* <IAAdvice /> */}
            {/* <SubscriptionsSection /> */}
            <TransactionsSection />
            <BudgetOverview />
            <ChallengesSection />
        </PageLayout>
    );
};

export default CentralExpensesPage;
