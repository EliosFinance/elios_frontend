import { useGetConnections } from '@/api/powens';
import { ConnectionType } from '@/types/connectionType';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

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

    if (isLoading) return <p>Chargement du budget...</p>;
    if (error) return <p>Erreur lors du chargement du budget.</p>;

    const remaining = budget - spending;

    return (
        <Card className='my-4 bg-green-50'>
            <CardHeader>
                <CardTitle>Budget</CardTitle>
                <CardDescription>Détails du budget mensuel</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    Budget mensuel :{' '}
                    <span className='font-semibold'>
                        {budget.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                </p>
                <p>
                    Dépenses réalisées :{' '}
                    <span className='font-semibold'>
                        {spending.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                </p>
                <p>
                    Reste à dépenser :{' '}
                    <span className='font-semibold'>
                        {remaining.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};

export default BudgetOverview;
