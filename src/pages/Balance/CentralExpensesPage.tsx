import React, { useState } from 'react';
import GraphiqueTimeframe from '@/components/balance/GraphiqueTimeframe';
import AccountsSummary from '@/components/balance/AccountsSummary';
import IAAdvice from '@/components/balance/IAAdvice';
import SubscriptionsSection from '@/components/balance/SubscriptionsSection';
import BudgetOverview from '@/components/balance/BudgetOverview';
import ChallengesSection from '@/components/balance/ChallengesSection';
import TransactionsSection from '@/components/balance/TransactionsSection';

const CentralExpensesPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="p-4 space-y-8 w-[100%]">
      <h1 className="text-3xl font-bold text-center mb-8">
        Centralisation des dépenses
      </h1>
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
    </div>
  );
};

export default CentralExpensesPage;