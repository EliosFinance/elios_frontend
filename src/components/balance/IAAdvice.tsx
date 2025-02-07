import React from 'react';

const IAAdvice: React.FC = () => {
  // Vous pouvez intégrer ici une API ou une logique d’IA pour renvoyer des recommandations.
  const advice = "Essayez de limiter les dépenses non essentielles et d'optimiser vos abonnements en comparant régulièrement leurs tarifs.";

  return (
    <div className="p-4 bg-blue-50 rounded shadow my-4">
      <h2 className="text-xl font-bold">Conseils IA</h2>
      <p className="mt-2 text-sm text-gray-800">{advice}</p>
    </div>
  );
};

export default IAAdvice;