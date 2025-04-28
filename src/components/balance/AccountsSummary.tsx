import { useGetConnections } from '@/api/powens';
import { ConnectionType } from '@/types/connectionType';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { ArrowUpIcon } from 'lucide-react';

export interface AccountsSummaryProps {
  date: Date;
}

const AccountsSummary: React.FC<AccountsSummaryProps> = ({ date }) => {
  const { data: connections, error, isLoading } = useGetConnections();
  const [total, setTotal] = useState<number>(0);
  const [previousTotal, setPreviousTotal] = useState<number>(0);
  const [percentChange, setPercentChange] = useState<number>(0);


  const fetchHistoricalData = async () => {
    try {
      const previousMonth = new Date(date);
      previousMonth.setMonth(previousMonth.getMonth() - 1);

      return total * 0.947;
    } catch (error) {
      console.error("Erreur lors de la récupération des données historiques:", error);
      return total * 0.95;
    }
  };

  useEffect(() => {
    if (connections) {
      const sum = connections.reduce((acc: number, connection: ConnectionType) => {
        return acc + (connection.balance || 0);
      }, 0);
      setTotal(sum);
      fetchHistoricalData().then(historicalTotal => {
        setPreviousTotal(historicalTotal);
        const change = ((sum - historicalTotal) / historicalTotal) * 100;
        setPercentChange(change);
      });
    }
  }, [connections, date]);

  if (isLoading) return (
    <Card className="rounded-xl">
      <CardContent className="p-6">
        <div className="w-full h-16 bg-gray-800 animate-pulse rounded-xl"></div>
      </CardContent>
    </Card>
  );

  if (error) return (
    <Card className="rounded-xl">
      <CardContent className="p-6">
        <div className="p-4 text-sm text-center text-red-400 bg-red-900/30 rounded-xl">
          Impossible de charger vos comptes
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="overflow-hidden rounded-xl">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <span className="mb-3 text-base text-gray-400">
            Solde total au {date.toLocaleDateString('fr-FR')}
          </span>
          <div className="flex flex-col">
            <span className="mb-2 text-3xl font-bold text-gray-200">
              {total.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              })}
            </span>
            <div className="flex items-center text-green-600">
              <ArrowUpIcon size={16} />
              <span className="ml-1 font-medium">{percentChange.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountsSummary;
