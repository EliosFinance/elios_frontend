import { useGetConnections } from '@/api/powens';
import { ConnectionType } from '@/types/connectionType';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';

const BudgetOverview: React.FC = () => {
	const { data: connections, error, isLoading } = useGetConnections();
	const [budget, setBudget] = useState<number>(0);
	const [spending, setSpending] = useState<number>(0);

	useEffect(() => {
		if (connections) {
			const totalSpending = connections.reduce((acc: number, connection: ConnectionType) => {
				return acc + (connection.balance || 0);
			}, 0);

			setBudget(totalSpending + 2000);
			setSpending(totalSpending);
		}
	}, [connections]);

	if (isLoading) return (
		<Card className="rounded-xl">
			<CardContent className="p-6">
				<div className="w-full h-64 bg-gray-800 animate-pulse rounded-xl"></div>
			</CardContent>
		</Card>
	);

	if (error) return (
		<Card className="rounded-xl">
			<CardContent className="p-6">
				<div className="p-4 text-sm text-center text-red-400 bg-red-900/30 rounded-xl">
					Impossible de charger votre budget
				</div>
			</CardContent>
		</Card>
	);

	const remaining = budget - spending;
	const spendingPercentage = Math.min(100, Math.round((spending / budget) * 100));

	const circumference = 2 * Math.PI * 70;
	const dashOffset = circumference - (circumference * spendingPercentage) / 100;

	return (
		<Card className="w-full rounded-xl">
			<CardContent className="p-6">
				<h2 className="mb-4 font-bold text-white">Budget mensuel</h2>

				<div className="flex items-center justify-center mb-6">
					<div className="relative w-48 h-48">
						<svg className="w-full h-full" viewBox="0 0 160 160">
							<circle
								cx="80"
								cy="80"
								r="70"
								fill="transparent"
								stroke="#374151"
								strokeWidth="12"
							/>
							<circle
								cx="80"
								cy="80"
								r="70"
								fill="transparent"
								stroke="#3B82F6"
								strokeWidth="12"
								strokeLinecap="round"
								strokeDasharray={circumference}
								strokeDashoffset={dashOffset}
								transform="rotate(-90 80 80)"
							/>
						</svg>

						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<span className="text-3xl font-bold text-white">{spendingPercentage}%</span>
							<span className="text-sm text-gray-400">utilisé</span>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-gray-400">Budget total</span>
						<span className="font-medium text-white">
							{budget.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
						</span>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-gray-400">Dépenses</span>
						<span className="font-medium text-blue-400">
							{spending.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
						</span>
					</div>

					<div className="flex items-center justify-between pt-3 border-t border-gray-700">
						<span className="text-white">Reste à dépenser</span>
						<span className="font-bold text-white">
							{remaining.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default BudgetOverview;
