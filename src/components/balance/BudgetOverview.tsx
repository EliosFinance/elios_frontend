import React from 'react';

const BudgetOverview: React.FC = () => {
  // Exemple de données budgétaires
  const budget = 2000; // budget mensuel
  const currentSpending = 1250; // dépenses déjà réalisées
  const remaining = budget - currentSpending;

  return (
    <div className="p-4 bg-green-50 rounded shadow my-4">
      <h2 className="text-xl font-bold">Budget</h2>
      <div className="mt-2">
        <p>
          Budget mensuel :{' '}
          <span className="font-semibold">
            {budget.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            })}
          </span>
        </p>
        <p>
          Dépenses réalisées :{' '}
          <span className="font-semibold">
            {currentSpending.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            })}
          </span>
        </p>
        <p>
          Reste à dépenser :{' '}
          <span className="font-semibold">
            {remaining.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            })}
          </span>
        </p>
        {/* Vous pouvez ajouter ici des graphiques ou des visuels créatifs */}
      </div>
    </div>
  );
};

export default BudgetOverview;