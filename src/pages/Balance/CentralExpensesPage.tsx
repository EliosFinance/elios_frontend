import React, { useState } from 'react';
import GraphiqueTimeframe from '@/components/balance/GraphiqueTimeframe';
import AccountsSummary from '@/components/balance/AccountsSummary';
import IAAdvice from '@/components/balance/IAAdvice';
import SubscriptionsSection from '@/components/balance/SubscriptionsSection';
import BudgetOverview from '@/components/balance/BudgetOverview';
import ChallengesSection from '@/components/balance/ChallengesSection';
import TransactionsSection from '@/components/balance/TransactionsSection';
import PageLayout from '@/layout/PageLayout';

const CentralExpensesPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <PageLayout title="Centralisation des dépenses">
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