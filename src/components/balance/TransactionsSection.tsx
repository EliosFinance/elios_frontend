import { useGetTransactions } from '@/api/powens';
import { TransactionType } from '@/types/transactionType';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { CalendarIcon } from 'lucide-react';

const TransactionsSection: React.FC = () => {
    const { data: transactions, error, isLoading } = useGetTransactions();
    const [latestTransactions, setLatestTransactions] = useState<TransactionType[]>([]);
    const [_recurringTotal, setRecurringTotal] = useState<number>(0);

	const parseTransactionDate = (tx: TransactionType): Date => {
		const dateValue = (tx as any).date || tx.last_update;
		const parsed = new Date(String(dateValue));
		return isNaN(parsed.getTime()) ? new Date() : parsed;
	};

	useEffect(() => {
		if (transactions) {
			const sorted = [...transactions].sort((a, b) => {
				return parseTransactionDate(b).getTime() - parseTransactionDate(a).getTime();
			});
			setLatestTransactions(sorted.slice(0, 5));
		}
	}, [transactions]);

	if (isLoading) {
		return (
			<Card className="rounded-xl">
				<CardContent className="p-6">
					<div className="w-full h-64 bg-gray-800 animate-pulse rounded-xl"></div>
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card className="rounded-xl">
				<CardContent className="p-6">
					<div className="p-4 text-sm text-center text-red-400 bg-red-900/30 rounded-xl">
						Impossible de charger vos transactions
					</div>
				</CardContent>
			</Card>
		);
	}

	const totalLatest = latestTransactions.reduce((acc, tx) => {
		return acc + (isNaN(Number(tx.value)) ? 0 : Number(tx.value));
	}, 0);

	return (
		<Card className="rounded-xl">
			<CardContent className="p-6">
				<h2 className="mb-4 text-xl font-bold text-white">Dernières transactions</h2>

				{latestTransactions.length > 0 ? (
					<>
						<div className="space-y-3">
							{latestTransactions.map((tx) => {
								const displayDate = parseTransactionDate(tx).toLocaleDateString('fr-FR');
								const value = Number(tx.value);

								return (
									<div key={tx.id} className="p-4 bg-gray-800 rounded-xl">
										<div className="flex flex-col w-full">
											<div className="flex items-start justify-between mb-2">
												<span className="font-medium text-white truncate">
													{tx.wording}
												</span>
												<span className="ml-2 font-bold text-red-500">
													{value.toLocaleString('fr-FR', {
														style: 'currency',
														currency: 'EUR',
													})}
												</span>
											</div>
											<div className="flex items-center text-sm text-gray-400">
												<CalendarIcon size={14} className="mr-2" />
												<span>{displayDate}</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>

						<div className="pt-4 mt-6 border-t border-gray-700">
							<div className="flex items-center justify-between">
								<span className="text-gray-400">Total récent</span>
								<span className="text-xl font-bold text-white">
									{totalLatest.toLocaleString('fr-FR', {
										style: 'currency',
										currency: 'EUR',
									})}
								</span>
							</div>
						</div>
					</>
				) : (
					<div className="py-8 text-center text-gray-400">
						Aucune transaction récente
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default TransactionsSection;
