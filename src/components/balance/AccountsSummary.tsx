import React, { useEffect, useState } from 'react';

export interface AccountsSummaryProps {
  date: Date;
}

const AccountsSummary: React.FC<AccountsSummaryProps> = ({ date }) => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // Simuler la récupération du total des comptes pour la date sélectionnée
    // Remplacez ceci par une requête API selon le backend.
    const simulatedTotal = Math.floor(Math.random() * 10000);
    setTotal(simulatedTotal);
  }, [date]);

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