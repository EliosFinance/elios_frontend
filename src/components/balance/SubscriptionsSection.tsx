import React from 'react';

type Subscription = {
  id: number;
  name: string;
  monthlyCost: number;
};

const subscriptions: Subscription[] = [
  { id: 1, name: 'Netflix', monthlyCost: 13.99 },
  { id: 2, name: 'Spotify', monthlyCost: 9.99 },
  { id: 3, name: 'Amazon Prime', monthlyCost: 5.99 },
];

const SubscriptionsSection: React.FC = () => {
  const totalRecurring = subscriptions.reduce((total, sub) => total + sub.monthlyCost, 0);

  return (
    <div className="p-4 bg-white rounded shadow my-4">
      <h2 className="text-xl font-bold">Abonnements</h2>
      <ul className="mt-2">
        {subscriptions.map((sub) => (
          <li key={sub.id} className="flex justify-between border-b py-2">
            <span>{sub.name}</span>
            <span>
              {sub.monthlyCost.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR'
              })}
            </span>
          </li>
        ))}
      </ul>
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <span>Total récurrent :</span>
        <span>
          {totalRecurring.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR'
          })}
        </span>
      </div>
    </div>
  );
};

export default SubscriptionsSection;