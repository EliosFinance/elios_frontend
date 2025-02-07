import React, { useEffect, useState } from 'react';
import { useGetConnections } from '@/api/powens';
import { ConnectionType } from '@/types/connectionType';

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
    <div className="p-4 bg-white rounded shadow my-4">
      <h2 className="text-xl font-bold">Montant des comptes</h2>
      <p className="mt-2 text-2xl">
        {total.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR'
        })}
      </p>
      <p className="text-sm text-gray-500">
        Pour la date : {date.toLocaleDateString('fr-FR')}
      </p>
    </div>
  );
};

export default AccountsSummary;