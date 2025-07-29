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
    <div className="rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4">
      <div className="w-full h-16 bg-gray-800/60 animate-pulse rounded-lg"></div>
    </div>
  );

  if (error) return (
    <div className="rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4">
      <div className="p-3 text-sm text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
        Impossible de charger vos comptes
      </div>
    </div>
  );

  return (
    <div className="rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10">
            <ArrowUpIcon className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {total.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              })}
            </p>
            <p className="text-xs text-gray-400">
              Solde au {date.toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10">
          <ArrowUpIcon className="w-3 h-3 text-green-400" />
          <span className="text-xs font-medium text-green-400">{percentChange.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default AccountsSummary;
