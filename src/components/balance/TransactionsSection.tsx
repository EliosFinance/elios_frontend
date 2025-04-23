import { useGetTransactions } from '@/api/powens';
import { TransactionType } from '@/types/transactionType';
// src/components/balance/TransactionsSection.tsx
import React, { useEffect, useState } from 'react';

const TransactionsSection: React.FC = () => {
    const { data: transactions, error, isLoading } = useGetTransactions();
    const [latestTransactions, setLatestTransactions] = useState<TransactionType[]>([]);
    const [recurringTotal, setRecurringTotal] = useState<number>(0);

    // Helper that returns tx.date if available, otherwise falls back to tx.last_update
    const parseTransactionDate = (tx: TransactionType): Date => {
        // Use "date" property if available. Otherwise, use "last_update".
        const dateValue = (tx as any).date || tx.last_update;
        const parsed = new Date(String(dateValue));
        if (isNaN(parsed.getTime())) {
            return new Date();
        }
        return parsed;
    };

    useEffect(() => {
        if (transactions) {
            // Sort transactions by the date returned by our helper in descending order.
            const sorted = [...transactions].sort((a, b) => {
                const timeA = parseTransactionDate(a).getTime();
                const timeB = parseTransactionDate(b).getTime();
                return timeB - timeA;
            });
            const latestFive = sorted.slice(0, 5);
            setLatestTransactions(latestFive);

            // Special logic for recurring payments:
            // We assume that recurring transactions have wording that includes "abonnement".
            const recurring = transactions.filter((tx) => {
                return tx.wording && typeof tx.wording === 'string' && tx.wording.toLowerCase().includes('abonnement');
            });
            const totalRecurring = recurring.reduce((acc: number, tx: TransactionType) => {
                const value = Number(tx.value);
                return acc + (isNaN(value) ? 0 : value);
            }, 0);
            setRecurringTotal(totalRecurring);
        }
    }, [transactions]);

    if (isLoading) {
        return <p>Chargement des transactions...</p>;
    }
    if (error) {
        return <p>Erreur lors du chargement des transactions.</p>;
    }

    const totalLatest = latestTransactions.reduce((acc, tx) => {
        const value = Number(tx.value);
        return acc + (isNaN(value) ? 0 : value);
    }, 0);

    return (
        <div className='p-4 my-4 rounded shadow'>
            <h2 className='mb-4 text-xl font-bold'>Dernières transactions</h2>
            {latestTransactions.length > 0 ? (
                <>
                    <ul className='divide-y divide-gray-300'>
                        {latestTransactions.map((tx) => {
                            const displayDate = parseTransactionDate(tx).toLocaleDateString('fr-FR');
                            return (
                                <li key={tx.id} className='flex justify-between py-2'>
                                    <span className='text-sm'>
                                        {displayDate} - {tx.wording}
                                    </span>
                                    <span className='font-bold'>
                                        {Number(tx.value).toLocaleString('fr-FR', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        })}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className='pt-4 mt-4 border-t'>
                        <p className='text-lg font-bold'>
                            Total des 5 derniers paiements :{' '}
                            {totalLatest.toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                            })}
                        </p>
                    </div>
                </>
            ) : (
                <p>Aucune transaction récente.</p>
            )}
        </div>
    );
};

export default TransactionsSection;
