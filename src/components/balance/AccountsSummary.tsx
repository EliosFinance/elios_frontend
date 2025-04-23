import { useGetConnections } from '@/api/powens';
import { ConnectionType } from '@/types/connectionType';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export interface AccountsSummaryProps {
    date: Date;
}

const AccountsSummary: React.FC<AccountsSummaryProps> = ({ date }) => {
    const { data: connections, error, isLoading } = useGetConnections();
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        if (connections) {
            const sum = connections.reduce((acc: number, connection: ConnectionType) => {
                return acc + (connection.balance || 0);
            }, 0);
            setTotal(sum);
        }
    }, [connections, date]);

    if (isLoading) return <p>Chargement des comptes...</p>;
    if (error) return <p>Erreur lors du chargement des comptes.</p>;

    return (
        <Card className='my-4'>
            <CardHeader>
                <CardTitle>Montant des comptes</CardTitle>
                <CardDescription>Pour la date : {date.toLocaleDateString('fr-FR')}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-2xl'>
                    {total.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                    })}
                </p>
            </CardContent>
        </Card>
    );
};

export default AccountsSummary;
