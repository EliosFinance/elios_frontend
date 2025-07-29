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
import { WalletIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CentralExpensesPage: React.FC = () => {
    const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('month');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const { data: connections, isLoading, isFetching } = useGetConnections();
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
            {/* Header avec icône et description */}
            <div className='flex items-start gap-3 mb-6'>
                <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 shadow-lg rounded-xl bg-gradient-to-br from-primary-500 to-primary-600'>
                    <WalletIcon className='w-6 h-6 text-white' />
                </div>
                <div className='flex-1'>
                    <h2 className='mb-1 text-xl font-bold text-white'>Gérez votre budget</h2>
                    <p className='text-sm leading-relaxed text-gray-400'>
                        Suivez vos dépenses, analysez vos habitudes et optimisez votre budget mensuel.
                    </p>
                </div>
            </div>

            <BlurItem
                isLoading={isLoading || isFetching}
                locked={!connections?.length}
                onClick={() => navigate(APP_ROUTES_ENUM.CONNECT_BANK_ACCOUNT)}
                variant='connectAccount'
                className='w-full min-h-[300px]'
            >
                <div className='space-y-6'>
                    {/* Graphique principal */}
                    <GraphiqueTimeframe
                        total={total}
                        timeframe={timeframe}
                        onTimeframeChange={setTimeframe}
                        onDateSelected={setSelectedDate}
                    />

                    {/* Section Budget */}
                    <BudgetOverview />

                    {/* Section Abonnements */}
                    <SubscriptionsSection />

                    {/* Section Transactions */}
                    <TransactionsSection />

                    {/* Section Défis */}
                    <ChallengesSection />
                </div>
            </BlurItem>
        </PageLayout>
    );
};

export default CentralExpensesPage;
