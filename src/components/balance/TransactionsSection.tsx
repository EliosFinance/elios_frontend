import { useGetTransactions } from '@/api/powens';
import { TransactionType } from '@/types/transactionType';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const TransactionsSection: React.FC = () => {
    // const { data: transactions, error, isLoading, isFetching } = useGetTransactions();
    const [latestTransactions, setLatestTransactions] = useState<TransactionType[]>([
        { id: 1, userId: 'me', limit: 5, wording: 'Monoprix PARIS 15', value: '-23.45', last_update: new Date('2024-07-23T10:30:00') },
        { id: 2, userId: 'me', limit: 5, wording: 'McDonald\'s CHAMPS ELYSEES', value: '-8.90', last_update: new Date('2024-07-22T19:15:00') },
        { id: 3, userId: 'me', limit: 5, wording: 'RATP NAVIGO MENSUEL', value: '-75.20', last_update: new Date('2024-07-22T08:00:00') },
        { id: 4, userId: 'me', limit: 5, wording: 'Virement PARENTS', value: '+400.00', last_update: new Date('2024-07-21T14:30:00') },
        { id: 5, userId: 'me', limit: 5, wording: 'Boulangerie PAUL', value: '-4.50', last_update: new Date('2024-07-21T07:45:00') }
    ]);
    const error = false;
    const isLoading = false;
    const isFetching = false;

    const parseTransactionDate = (tx: TransactionType): Date => {
        const dateValue = (tx as any).date || tx.last_update;
        const parsed = new Date(String(dateValue));
        return isNaN(parsed.getTime()) ? new Date() : parsed;
    };

    const getTransactionIcon = (wording: string) => {
        if (wording.toLowerCase().includes('monoprix') || wording.toLowerCase().includes('carrefour')) {
            return '🛒';
        }
        if (wording.toLowerCase().includes('mcdonald') || wording.toLowerCase().includes('kfc') || wording.toLowerCase().includes('burger')) {
            return '🍔';
        }
        if (wording.toLowerCase().includes('ratp') || wording.toLowerCase().includes('navigo') || wording.toLowerCase().includes('transport')) {
            return '🚇';
        }
        if (wording.toLowerCase().includes('virement') || wording.toLowerCase().includes('parents')) {
            return '💰';
        }
        if (wording.toLowerCase().includes('boulangerie') || wording.toLowerCase().includes('paul') || wording.toLowerCase().includes('café')) {
            return '🥖';
        }
        return '💳';
    };

    if (isLoading || isFetching) {
        return (
            <div className='rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4'>
                <div className='w-full h-48 bg-gray-800/60 animate-pulse rounded-lg'></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4'>
                <div className='p-3 text-sm text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg'>
                    Impossible de charger vos transactions
                </div>
            </div>
        );
    }

    const totalLatest = latestTransactions.reduce((acc, tx) => {
        return acc + (isNaN(Number(tx.value)) ? 0 : Number(tx.value));
    }, 0);

    return (
        <div className='rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4'>
            <div className='flex items-center gap-2 mb-4'>
                <div className='flex items-center justify-center w-6 h-6 rounded-lg bg-white/5 border border-white/10'>
                    <CalendarIcon className='w-4 h-4 text-primary-400' />
                </div>
                <h3 className='text-lg font-bold text-white'>Dernières transactions</h3>
            </div>

            {latestTransactions.length > 0 ? (
                <>
                    <div className='space-y-3 mb-4'>
                        {latestTransactions.map((tx) => {
                            const displayDate = parseTransactionDate(tx).toLocaleDateString('fr-FR');
                            const value = Number(tx.value);

                            return (
                                <div key={tx.id} className='p-3 rounded-lg bg-white/5 border border-white/10'>
                                    <div className='flex items-start justify-between gap-3'>
                                        <div className='flex items-center gap-3 flex-1 min-w-0'>
                                            <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex-shrink-0'>
                                                <span className='text-lg'>{getTransactionIcon(tx.wording || '')}</span>
                                            </div>
                                            <div className='flex-1 min-w-0'>
                                                <p className='font-medium text-white text-sm leading-tight truncate'>
                                                    {tx.wording}
                                                </p>
                                                <div className='flex items-center text-xs text-gray-400 mt-1'>
                                                    <CalendarIcon className='w-3 h-3 mr-1' />
                                                    <span>{displayDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex-shrink-0'>
                                            <span
                                                className={`font-bold text-sm ${
                                                    value < 0 ? 'text-red-400' : 'text-green-400'
                                                }`}
                                            >
                                                {value.toLocaleString('fr-FR', {
                                                    style: 'currency',
                                                    currency: 'EUR',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className='pt-3 border-t border-white/10'>
                        <div className='flex items-center justify-between'>
                            <span className='text-white font-medium'>Total récent</span>
                            <span className='text-white font-bold'>
                                {totalLatest.toLocaleString('fr-FR', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <div className='py-6 text-center text-gray-400'>
                    <svg className='w-12 h-12 mx-auto mb-2 text-gray-500' viewBox='0 0 24 24' fill='none'>
                        <path d='M12 2v20m8-10H4' stroke='currentColor' strokeWidth='2' />
                    </svg>
                    <p className='text-sm'>Aucune transaction récente</p>
                </div>
            )}
        </div>
    );
};

export default TransactionsSection;
